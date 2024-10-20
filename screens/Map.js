import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Device from 'expo-device';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDEV7kL-sYn-Ymre_NIpsVWdvhZt0T-ddc'; // Replace with your API key

const DEFAULT_LOCATION = {
  latitude: 37.7749, // Default to San Francisco, for example
  longitude: -122.4194,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const Map = () => {
  const [location, setLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]); // To store nearby restaurants
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Store the selected restaurant
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg('This will not work on an Android Emulator. Try setting a mock location.');
        setLocation(DEFAULT_LOCATION); // Set a default location when using the emulator
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        fetchNearbyRestaurants(currentLocation.coords.latitude, currentLocation.coords.longitude); // Fetch nearby restaurants
      } catch (error) {
        console.error('Error getting location:', error);
        setLocation(DEFAULT_LOCATION); // Use default location on error
      }
    })();
  }, []);

  // Function to fetch nearby restaurants using Google Places API
  const fetchNearbyRestaurants = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAPS_APIKEY}`
      );
      setRestaurants(response.data.results); // Store the restaurants in state
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
    }
  };

  // Function to animate the map to show both the current and searched location
  const moveToLocation = (searchedLocationCoords) => {
    if (location && searchedLocationCoords) {
      mapRef.current.animateToRegion({
        latitude: (location.coords.latitude + searchedLocationCoords.latitude) / 2,
        longitude: (location.coords.longitude + searchedLocationCoords.longitude) / 2,
        latitudeDelta: Math.abs(location.coords.latitude - searchedLocationCoords.latitude) * 2,
        longitudeDelta: Math.abs(location.coords.longitude - searchedLocationCoords.longitude) * 2,
      }, 1000); // 1000ms animation duration
    }
  };

  // Function to show directions to the selected restaurant
  const handleRestaurantClick = (restaurantCoords) => {
    setSelectedRestaurant(restaurantCoords); // Set the clicked restaurant as the selected one
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Search Bar */}
      <SearchBar
        onSearch={(data, details) => {
          const { lat, lng } = details.geometry.location;
          const searchedLocationCoords = { latitude: lat, longitude: lng };
          setSearchedLocation(searchedLocationCoords);
          moveToLocation(searchedLocationCoords); // Move the map to show both locations
        }}
      />

      {/* Error Message or Map */}
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.coords?.latitude || location.latitude, // Handle emulator fallback
            longitude: location.coords?.longitude || location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          {/* Marker for Current Location */}
          <Marker
            coordinate={{
              latitude: location.coords?.latitude || location.latitude,
              longitude: location.coords?.longitude || location.longitude,
            }}
            title="Your Location"
            description="This is where you are"
            // Custom marker image
          >
            <Image className="h-10 w-10" source={require('../assets/images/human.png')} />
          </Marker>

          {/* Marker for Searched Location */}
          {searchedLocation && (
            <Marker
              coordinate={searchedLocation}
              title="Searched Location"
              description="This is your search result"
            />
          )}

          {/* Draw Polyline between Current Location and Searched Location */}
          {searchedLocation && location && (
            <MapViewDirections
              origin={{
                latitude: location.coords?.latitude || location.latitude,
                longitude: location.coords?.longitude || location.longitude,
              }}
              destination={searchedLocation}
              apikey={GOOGLE_MAPS_APIKEY} // Use your Google Maps API Key
              strokeWidth={4}
              strokeColor="blue"
              onReady={(result) => {
                // Fit the map to include both locations with padding
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    bottom: 50,
                    left: 50,
                    top: 50,
                  },
                });
              }}
              onError={(errorMessage) => {
                console.log('Error with directions: ', errorMessage);
              }}
            />
          )}

          {/* Draw Polyline to the Selected Restaurant */}
          {selectedRestaurant && location && (
            <MapViewDirections
              origin={{
                latitude: location.coords?.latitude || location.latitude,
                longitude: location.coords?.longitude || location.longitude,
              }}
              destination={selectedRestaurant} // Selected restaurant
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="green"
              onReady={(result) => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    bottom: 50,
                    left: 50,
                    top: 50,
                  },
                });
              }}
              onError={(errorMessage) => {
                console.log('Error with directions to restaurant: ', errorMessage);
              }}
            />
          )}

          {/* Markers for Nearby Restaurants */}
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
              title={restaurant.name}
              description={restaurant.vicinity}
              pinColor="red" // Change the color of restaurant markers
              onPress={() => handleRestaurantClick({
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              })} // Handle restaurant click
            >
              <Image className="h-10 w-10" source={require('../assets/images/res.png')} />
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}

      {/* Show Nearby Restaurants Button at the Bottom */}
      {location && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => fetchNearbyRestaurants(location.coords.latitude, location.coords.longitude)}
          >
            <Text style={styles.buttonText}>Show Nearby Restaurants</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Position the button at the bottom
    left: 16,
    right: 16,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#4CAF50', // Green background
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Map;
