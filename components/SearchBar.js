import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        textInputProps={{
          value: searchText,
          onChangeText: (text) => setSearchText(text),
        }}
        onPress={(data, details = null) => {
          if (details && onSearch) {
            onSearch(data, details); // Pass the details to the parent component (Map)
          }
        }}
        query={{
          key: 'AIzaSyDK_64b5vzg3mMdjgQq1yJsK7BK7cIpjY8', // Ensure your API key is valid
          language: 'en',
        }}
        fetchDetails={true} // Needed to fetch full details like lat/lng
        styles={{
          textInput: {
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 10,
            marginVertical: 10,
            elevation: 2, // Add shadow for Android
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: '100%',
    position: 'absolute',
    top: 80,
    padding: 20,
    zIndex: 1, // Ensure it appears above the map
  },
  clearButton: {
    position: 'absolute',
    right: 30,
    top: 35,
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 15,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
