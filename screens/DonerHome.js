"use client"
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, Trophy, TrophyIcon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DonerHome = () => {

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [donerdata, setDonerData] = useState(null);
    const [error, setError] = useState(null);
      const navigation = useNavigation();

    useEffect(() => {
      const fetchDonerData = async () => {
          try {
              const token = await AsyncStorage.getItem('token');
              const donerId = await AsyncStorage.getItem('id');
  
              console.log('Retrieved token:', token);
              console.log('Retrieved donerId:', donerId);
  
              if (!token || !donerId) {
                  console.error('Token or donerId is missing');
                  setError('Token or donerId is missing');
                  return;
              }
  
              const response = await fetch(`http://10.0.2.2:4000/doner/${donerId}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
  
              const data = await response.json();
              console.log("Response Data:", data);
  
              if (response.ok) {
                  setDonerData(data);
              } else {
                  console.error('Failed to fetch doner data:', data);
                  setError(data.error || 'Failed to fetch doner data');
              }
          } catch (error) {
              console.error('Network request failed:', error);
              setError('Network request failed');
          }
      };
  
      fetchDonerData();
  }, []);


    const items = [
        { id: 1, weekday: 'Monday', date: 'July 1, 2024', time: '5-6pm', address: "Shyambazar", donor: 'Food Doner 1', item: 'Food Item 1', volunteer: 'Volunteer 1' },
        { id: 2, weekday: 'Wednesday', date: 'July 2, 2024', time: '6-7pm',address: "Shyambazar", donor: 'Food Doner 2', item: 'Food Item 2', volunteer: 'Volunteer 2' },
        { id: 3, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm',address: "Shyambazar", donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
        { id: 4, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm',address: "Shyambazar", donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
        { id: 5, weekday: 'Friday', date: 'July 3, 2024', time: '7-8pm',address: "Shyambazar", donor: 'Food Doner 3', item: 'Food Item 3', volunteer: 'Volunteer 3' },
      ];
    const details = [
        { id:1, package: "Food Package 1", item: "Vegatables and Fruits", time: "3:00-5:00pm", date:"Today"},
        { id:2, package: "Food Package 1", item: "Vegatables and Fruits", time: "3:00-5:00pm", date:"Today"},
        { id:3, package: "Food Package 1", item: "Vegatables and Fruits", time: "3:00-5:00pm", date:"Today"},
        { id:4, package: "Food Package 1", item: "Vegatables and Fruits", time: "3:00-5:00pm", date:"Today"},
    ]
    

  const visibleItems = expanded ? items : items.slice(0, 2); 
  const visibleDetails = open ? details : details.slice(0, 2); 

  return (
    <View className="flex-1 bg-white">
        <View className="relative mt-10 top-0 left-0 right-0 z-10 bg-white shadow-md py-4 px-4 flex-row items-center justify-between">
        <Image source={require('../assets/images/icon.png')}  />
        <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
      </View> 
    <ScrollView className="">
      <View className="flex-1 w-full items-center py-10">
          <Text className="text-4xl w-[90%] font-semibold">Hi {donerdata ? `${donerdata?.company}` : "Donor"}!</Text>
          <View className="flex flex-row justify-between w-[90%]">
          <Text className="text-2xl  font-semibold mt-2">Upcoming Signups</Text>
          <TouchableOpacity className="p-3 rounded-full bg-[#659667] " onPress={() => navigation.push('FoodListing')} >
            <Text className="text-base w-fit text-white font-semibold">+ Add Food</Text>
          </TouchableOpacity>
          </View>
          <View className="mt-4 space-y-4">
            {visibleItems.map(item => (
              <TouchableOpacity key={item.id} className="flex-row justify-between items-center bg-white rounded-3xl shadow-md shadow-gray-500 p-5 w-[90%]">
                <View>
                  <Text className="text-xl font-semibold">{`${item.weekday}, ${item.date} ${item.time}`}</Text>
                  <Text className="text-lg text-gray-500 font-semibold">Food Item: {item.item}</Text>
                  <Text className="text-lg text-gray-500 font-semibold">Volunteer: {item.volunteer}</Text>
                  <Text className="text-lg text-gray-500 font-semibold">Charity Dropoff: {item.address}</Text>
                </View>
                <View className="p-2 bg-[#659667] rounded-full justify-center items-center">
                  <ChevronRight color={'white'} className="max-w-[30px]" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setExpanded(!expanded)} className="w-[90%] mt-5 bg-[#659667] rounded-full items-center p-1">
            <Text className="text-white font-semibold text-lg">
              {expanded ? 'See Less' : 'See All'}
            </Text>
          </TouchableOpacity>
          <View className="my-3 items-center w-[90%]">
            <Text className="text-2xl w-full font-semibold">Your Impact</Text>
            <View className="w-full justify-center flex flex-row gap-1 mt-4">
              <TouchableOpacity className="bg-white rounded-3xl w-1/3 shadow-md shadow-gray-500 p-3">
                <Text className="text-3xl text-center font-bold">700</Text>
                <Text className="text-center">Pounds of food Received</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-3xl w-1/3 shadow-md shadow-gray-500 p-3">
                <Text className="text-3xl text-center font-bold">$800</Text>
                <Text className="text-center">Pounds Donated</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-3xl w-1/3 shadow-md shadow-gray-500 p-3">
                <Text className="text-4xl text-center font-bold"><TrophyIcon color={'black'} fill={'black'} size={30} /></Text>
                <Text className="text-center">View Leaderboard</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="mt-5 w-full bg-black rounded-full items-center p-1">
              <Text className="text-white font-semibold text-lg">
                Explore Partnerships and Benefits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-5 w-full bg-[#659667] rounded-full items-center p-1">
              <Text className="text-white font-semibold text-lg">
                Donate Today!
              </Text>
            </TouchableOpacity>
            <Text className="text-2xl w-full font-semibold my-3">Your Food Donation Listings</Text>
            <View className="w-full">
                <View  className="flex-col justify-between  bg-white rounded-xl shadow-md shadow-gray-500 p-5 ">
                {visibleDetails.map(details => (
                <TouchableOpacity key={details.id}>
                    <View className="flex flex-col ">
                        <Text className="font-semibold text-lg">{details.package} - {details.item}</Text>
                       <Text className="text-gray-400 font-semibold"> {details.time}, {details.date}</Text>
                       <View className="bg-gray-300 h-[1px] mt-2"></View>
                    </View>
                    
                </TouchableOpacity>
                
                ))}
            
            <View className="items-center ">
            <Text onPress={() => setOpen(!open)} className=" text-blue-500  font-semibold text-lg">
              {open ? 'See Less' : 'See All'}
            </Text>
            </View>
            </View>
            </View>
            <TouchableOpacity className="mt-5 w-full bg-[#659667] rounded-full items-center p-1" onPress={() => navigation.push('ManageListing')}>
              <Text className="text-white font-semibold text-lg">
                Manage Listings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}
 export default DonerHome;