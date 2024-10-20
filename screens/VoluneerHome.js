import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Link } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { ChevronRight, TrophyIcon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VolunteerHome = () => {
    const [expanded, setExpanded] = useState(false);
    const [volunteerData, setVolunteerData] = useState(null);
    const [error, setError] = useState(null);

    const width = Dimensions.get('window').width;

    // Sample data for upcoming signups and card data
    const items = [
        { id: 1, weekday: 'Monday', date: 'July 1, 2024', time: '5-6pm', address: "Shyambazar", donor: 'Food Doner 1', item: 'Food Item 1', volunteer: 'Volunteer 1' },
        { id: 2, weekday: 'Wednesday', date: 'July 2, 2024', time: '6-7pm', address: "Shyambazar", donor: 'Food Doner 2', item: 'Food Item 2', volunteer: 'Volunteer 2' },
        { id: 3, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm', address: "Shyambazar", donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
        { id: 4, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm', address: "Shyambazar", donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
        { id: 5, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm', address: "Shyambazar", donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
    ];

    const cardData = [
        { id: 1, name: "Restaurant 1", distance: "2.4 km away", pickups: "4 Available pickups", image: require('../assets/images/img.jpg') },
        { id: 2, name: "Restaurant 2", distance: "3.1 km away", pickups: "3 Available pickups", image: require('../assets/images/img.jpg') },
        { id: 3, name: "Restaurant 3", distance: "1.2 km away", pickups: "5 Available pickups", image: require('../assets/images/img.jpg') },
        { id: 4, name: "Restaurant 4", distance: "4.0 km away", pickups: "2 Available pickups", image: require('../assets/images/img.jpg') },
        { id: 5, name: "Restaurant 5", distance: "2.8 km away", pickups: "6 Available pickups", image: require('../assets/images/img.jpg') },
    ];

    const visibleItems = expanded ? items : items.slice(0, 2);

    useEffect(() => {
        const fetchVolunteerData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const volunteerId = await AsyncStorage.getItem('id');
    
                console.log('Retrieved token:', token);
                console.log('Retrieved volunteerId:', volunteerId);
    
                if (!token || !volunteerId) {
                    console.error('Token or volunteerId is missing');
                    setError('Token or volunteerId is missing');
                    return;
                }
    
                const response = await fetch(`http://10.0.2.2:4000/volunteer/${volunteerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                const data = await response.json();
                console.log("Response Data:", data);
    
                if (response.ok) {
                    setVolunteerData(data);
                } else {
                    console.error('Failed to fetch volunteer data:', data);
                    setError(data.error || 'Failed to fetch volunteer data');
                }
            } catch (error) {
                console.error('Network request failed:', error);
                setError('Network request failed');
            }
        };
    
        fetchVolunteerData();
    }, []);

    return (
        <View className="flex-1 bg-white">
            <View className="relative mt-10 top-0 left-0 right-0 z-10 bg-white shadow-md py-4 px-4 flex-row items-center justify-between">
                <Image source={require('../assets/images/icon.png')} />
                <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
            </View>
            <ScrollView>
                <View className="flex-1 w-full items-center">
                    <Text className="text-4xl w-[90%] font-semibold">
                        Hi {volunteerData ? `${volunteerData.fname} ${volunteerData.lname}` : "Volunteer"}! 
                    </Text>
                    {error && <Text className="text-red-500">{error}</Text>}
                    <Text className="text-2xl w-[90%] font-semibold mt-2">Upcoming Signups</Text>
                    <View className="mt-4 space-y-4">
                        {visibleItems.map(item => (
                            <TouchableOpacity key={item.id} className="flex-row justify-between items-center bg-white rounded-3xl shadow-md shadow-gray-500 p-5 w-[90%]">
                                <View>
                                    <Text className="text-xl font-semibold">{`${item.weekday}, ${item.date} ${item.time}`}</Text>
                                    <Text className="text-lg text-gray-500 font-semibold">Food Item: {item.item}</Text>
                                    <Text className="text-lg text-gray-500 font-semibold">Volunteer: {item.volunteer}</Text>
                                    <Text className="text-lg text-gray-500 font-semibold">Charity Dropoff: {item.address}</Text>
                                </View>
                                <View className="p-2 bg-[#988AC7] rounded-full justify-center items-center">
                                    <ChevronRight color={'white'} className="max-w-[30px]" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setExpanded(!expanded)} className="w-[90%] mt-5 bg-[#988AC7] rounded-full items-center p-1">
                        <Text className="text-white font-semibold text-lg">
                            {expanded ? 'See Less' : 'See All'}
                        </Text>
                    </TouchableOpacity>
                    <View className="my-3 items-center w-[90%]">
                        <Text className="text-2xl w-full font-semibold">Your Impact</Text>
                        <View className="w-full justify-center flex flex-row gap-1 mt-4">
                            <TouchableOpacity className="bg-white rounded-3xl w-1/4 shadow-md shadow-gray-500 p-2">
                                <Text className="text-3xl text-center font-bold">150</Text>
                                <Text className="text-center">Pounds of food Received</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl w-1/4 shadow-md shadow-gray-500 p-2">
                                <Text className="text-3xl text-center font-bold">200</Text>
                                <Text className="text-center">Hours Volunteered</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl w-1/4 shadow-md shadow-gray-500 p-2">
                                <Text className="text-3xl text-center font-bold">$800</Text>
                                <Text className="text-center">Pounds Donated</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl w-1/4 shadow-md shadow-gray-500 p-2">
                                <Text className="text-4xl text-center font-bold"><TrophyIcon color={'black'} fill={'black'} size={30} /></Text>
                                <Text className="text-center">View Leaderboard</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="mt-5 w-full bg-black rounded-full items-center p-1">
                            <Text className="text-white font-semibold text-lg">
                                View Volunteer Records + Claim Hours
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mt-5 w-full bg-[#988AC7] rounded-full items-center p-1">
                            <Text className="text-white font-semibold text-lg">
                                Donate Today!
                            </Text>
                        </TouchableOpacity>
                        <Text className="text-2xl w-full font-semibold my-3">Opportunities Near You</Text>

                        {/* Carousel Component */}
                        <View className="w-full flex-1 justify-center items-center">
                            <Carousel
                                width={width}
                                height={width / 2}
                                autoPlay={false}
                                data={cardData} // Use cardData here
                                scrollAnimationDuration={1000}
                                itemWidth={width * 0.4} // Adjust this value to control item width
                                style={{ flexGrow: 0 }} // Adjust the container style to remove gaps
                                renderItem={({ item }) => (
                                    <View className="h-[200px] w-[200px] rounded-lg border items-center justify-center" style={{ flex: 1 }}>
                                        <Image 
                                            source={item.image} 
                                            className="h-[100px] w-full" 
                                        />
                                        <View className="p-2">
                                            <Text className="font-semibold text-base">{item.name}</Text>
                                            <Text>{item.distance}</Text>
                                            <Text>{item.pickups}</Text>
                                            <Link to={{ screen: 'CharityHome'}} >
                                                <Text className="text-blue-600 font-semibold underline">See Details</Text>
                                            </Link>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default VolunteerHome;
