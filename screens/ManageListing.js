import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const initialDetails = [
    { id: 1, package: "Food Package 1", item: "Vegetables and Fruits", time: "3:00-5:00pm", date: "Today" },
    { id: 2, package: "Food Package 2", item: "Canned Goods", time: "4:00-6:00pm", date: "Tomorrow" },
    { id: 3, package: "Food Package 3", item: "Bread and Pastries", time: "1:00-3:00pm", date: "Next Week" },
    { id: 4, package: "Food Package 4", item: "Dairy Products", time: "2:00-4:00pm", date: "Next Month" },
];

const ManageListing = () => {
    const [details, setDetails] = useState(initialDetails);
    const [openUpcoming, setOpenUpcoming] = useState(false);
    const [openFuture, setOpenFuture] = useState(false);
    const navigation = useNavigation();

    const ongoingListings = details.slice(0, 2);
    const [upcomingListings, setUpcomingListings] = useState(details.slice(0, 2));
    const [futureListings, setFutureListings] = useState(details.slice(2));

    const handleDelete = (id) => {
        setUpcomingListings(upcomingListings.filter(item => item.id !== id));
        setFutureListings(futureListings.filter(item => item.id !== id));
        Alert.alert("Deleted", "The donation listing has been deleted.");
    };

    const handleLive = (item) => {
        setFutureListings(futureListings.filter(listing => listing.id !== item.id));
        setUpcomingListings([...upcomingListings, item]);
        Alert.alert("Moved to Upcoming", "The donation listing is now marked as Upcoming.");
    };

    const toggleUpcoming = () => {
        setOpenUpcoming(!openUpcoming);
    };

    const toggleFuture = () => {
        setOpenFuture(!openFuture);
    };

    return (
        <View className="flex-1 bg-white">
            <Header />
            <ScrollView>
                {/* Ongoing Donation Listings */}
                <View className="w-full flex items-center">
                    <Text className="text-2xl font-semibold my-3 w-[90%]">Ongoing Donation Listings</Text>
                    <View className="w-[90%]">
                        <View className="flex-col justify-between bg-white rounded-xl shadow-md shadow-gray-500 p-5">
                            {ongoingListings.map((item) => (
                                <View key={item.id} className="mb-4">
                                    <View className="flex flex-col">
                                        <Text className="font-semibold text-lg">{item.package} - {item.item}</Text>
                                        <Text className="text-gray-400 font-semibold">{item.time}, {item.date}</Text>
                                        <View className="bg-gray-300 h-[1px] mt-2"></View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Upcoming Donation Listings */}
                <View className="w-full flex items-center">
                    <Text className="text-2xl font-semibold my-3 w-[90%]">Upcoming Donation Listings</Text>
                    <View className="w-[90%]">
                        <View className="flex-col justify-between bg-white rounded-xl shadow-md shadow-gray-500 p-5">
                            {(openUpcoming ? upcomingListings : upcomingListings.slice(0, 2)).map((item) => (
                                <View key={item.id} className="mb-4">
                                    <View className="flex flex-col">
                                        <Text className="font-semibold text-lg">{item.package} - {item.item}</Text>
                                        <Text className="text-gray-400 font-semibold">{item.time}, {item.date}</Text>
                                        <View className="bg-gray-300 h-[1px] mt-2"></View>
                                    </View>
                                    {/* Buttons */}
                                    <View className="flex-row mt-2 justify-between">
                                        <TouchableOpacity
                                            className="bg-blue-500 p-2 rounded-lg"
                                            onPress={() => Alert.alert("View", `Viewing details for ${item.package}`)}>
                                            <Text className="text-white font-semibold">View</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="bg-green-500 p-2 rounded-lg"
                                            onPress={() => navigation.push('FoodListing')}>
                                            <Text className="text-white font-semibold">Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="bg-red-500 p-2 rounded-lg"
                                            onPress={() => handleDelete(item.id)}>
                                            <Text className="text-white font-semibold">Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <View className="items-center">
                                <Text onPress={toggleUpcoming} className="text-blue-500 font-semibold text-lg">
                                    {openUpcoming ? 'See Less' : 'See All'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Future Donation Listings */}
                <View className="w-full flex items-center">
                    <Text className="text-2xl font-semibold my-3 w-[90%]">Future Donation Listings</Text>
                    <View className="w-[90%]">
                        <View className="flex-col justify-between bg-white rounded-xl shadow-md shadow-gray-500 p-5">
                            {(openFuture ? futureListings : futureListings.slice(0, 2)).map((item) => (
                                <View key={item.id} className="mb-4">
                                    <View className="flex flex-col">
                                        <Text className="font-semibold text-lg">{item.package} - {item.item}</Text>
                                        <Text className="text-gray-400 font-semibold">{item.time}, {item.date}</Text>
                                        <View className="bg-gray-300 h-[1px] mt-2"></View>
                                    </View>
                                    {/* Buttons */}
                                    <View className="flex-row mt-2 justify-between">
                                        <TouchableOpacity
                                            className="bg-blue-500 p-2 rounded-lg"
                                            onPress={() => Alert.alert("View", `Viewing details for ${item.package}`)}>
                                            <Text className="text-white font-semibold">View</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="bg-orange-500 p-2 rounded-lg"
                                            onPress={() => handleLive(item)}>
                                            <Text className="text-white font-semibold">Live</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="bg-green-500 p-2 rounded-lg"
                                            onPress={() => navigation.push('FoodListing')}>
                                            <Text className="text-white font-semibold">Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <View className="items-center">
                                <Text onPress={toggleFuture} className="text-blue-500 font-semibold text-lg">
                                    {openFuture ? 'See Less' : 'See All'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ManageListing;
