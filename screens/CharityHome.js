"use client"
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, TrophyIcon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CharityHome = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
  
      if (!token || !userId) {
          console.error('Token or userId is missing');
          return;
      }
  
      try {
          const response = await fetch(`http://10.0.2.2:4000/user/${userId}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
  
          const data = await response.json();
          console.log("Response Data:", data);
  
          if (response.ok) {
              setUserData(data);
          } else {
              console.error('Failed to fetch user data:', data);
          }
      } catch (error) {
          console.error('Network request failed:', error);
      }
  };

      fetchUserData();
  }, []);



  const items = [
    { id: 1, weekday: 'Monday', date: 'July 1, 2024', time: '5-6pm', donor: 'Food Doner 1', item: 'Food Item 1', volunteer: 'Volunteer 1' },
    { id: 2, weekday: 'Wednesday', date: 'July 2, 2024', time: '6-7pm', donor: 'Food Doner 2', item: 'Food Item 2', volunteer: 'Volunteer 2' },
    { id: 3, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm', donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
    { id: 4, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm', donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
    { id: 5, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm', donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
  ];

  const visibleItems = expanded ? items : items.slice(0, 2); // Show all if expanded, otherwise only the first 2

  return (
    <View className="flex-1 bg-gray-50 ">
      {/* Fixed Header */}
      <View className="relative mt-10 top-0 left-0 right-0 z-10 bg-gray-50 shadow-md py-4 px-4 flex-row items-center justify-between">
        <Image source={require('../assets/images/icon.png')}  />
        <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
      </View>
      
      {/* Scrollable Content */}
      <ScrollView>
        <View className="flex-1 w-full mb-10">
        <View className="flex-1 justify-start items-center ">
            {userData ? (
                <Text className="text-4xl font-semibold">Hi {userData.company}!</Text>
            ) : (
                <Text className="text-4xl font-semibold">Hi Charity</Text>
            )}
            <Text className="text-2xl font-semibold mt-2">Upcoming Deliveries</Text>
        </View>
          
          <View className="mt-4 flex-1 justify-center items-center space-y-4">
            {visibleItems.map(item => (
              <TouchableOpacity key={item.id} className="flex-row justify-between items-center bg-white rounded-3xl shadow-md shadow-gray-500 p-5 w-[90%]">
                <View>
                  <Text className="text-xl font-semibold">{`${item.weekday}, ${item.date} ${item.time}`}</Text>
                  <Text className="text-lg text-gray-500 font-semibold">Food Doner: {item.donor}</Text>
                  <Text className="text-lg text-gray-500 font-semibold">Food Item: {item.item}</Text>
                  <Text className="text-lg text-gray-500 font-semibold">Volunteer: {item.volunteer}</Text>
                </View>
                <View className="p-2 bg-[#415578] rounded-full justify-center items-center">
                  <ChevronRight color={'white'} className="max-w-[20px]" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
         <View className="flex-1 justify-center items-center shadow-md shadow-gray-500">
         <TouchableOpacity onPress={() => setExpanded(!expanded)} className="w-[90%] mt-5 bg-[#415578] rounded-full items-center p-1 ">
            <Text className="text-white font-semibold text-lg">
              {expanded ? 'See Less' : 'See All'}
            </Text>
          </TouchableOpacity>
         </View>
          <View className="mt-10 flex-1 justify-center w-full px-8">
            <Text className="text-2xl font-semibold">Your Impact</Text>
            <View className=" flex-1 flex-row gap-1 mt-4">
              <TouchableOpacity className="bg-white rounded-3xl w-1/3 shadow-md shadow-gray-500 flex flex-col justify-between p-2">
                <Text className="text-3xl text-center font-bold">700</Text>
                <Text className="text-center">Pounds of food Received</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-3xl w-1/3 shadow-md shadow-gray-500 flex flex-col justify-between p-2">
                <Text className="text-3xl text-center font-bold">$800</Text>
                <Text className="text-center">Pounds Donated</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-3xl w-1/3 shadow-md shadow-gray-500 flex flex-col justify-between p-2">
                <Text className="text-4xl text-center font-bold"><TrophyIcon color={'black'} fill={'black'} size={30} /></Text>
                <Text className="text-center">View Leaderboard</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="mt-5 bg-black rounded-full items-center p-1 shadow-md shadow-gray-500">
              <Text className="text-white font-semibold text-lg">
                Explore Partnerships and Benefits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-5 bg-[#415578] rounded-full items-center p-1 shadow-md shadow-gray-500">
              <Text className="text-white font-semibold text-lg">
                Donate Today!
              </Text>
            </TouchableOpacity>
          </View>          
        </View>
      </ScrollView>
    </View>
  );
};

export default CharityHome;
