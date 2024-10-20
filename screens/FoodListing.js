import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView from "react-native-maps";
import { X } from "lucide-react-native";
import Header from '../components/Header';

const FoodListing = () => {
    const { formState: { errors }, control, handleSubmit } = useForm();
    const [showPicker, setShowPicker] = useState(false);

    const showTimePicker = () => {
        setShowPicker(true);
    };

    const submit = async (data) => {
        console.log('Form data:', data);
        Alert.alert('Form Submitted', 'Your food donation listing has been created.');
        navigation.push('DonerHome');
        
    };

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Header/>
            <View className="mb-6">
                <Text className="text-2xl font-bold mb-2">Create New Food Donation Listing</Text>
                <Text className="text-gray-600">Fill in the details below to add your food donation.</Text>
            </View>

            <View className="gap-6">
                <View>
                    <Controller
                        name="typefood"
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View className="mb-4">
                                <Text className="text-base font-semibold mb-2">Type of Food</Text>
                                <TextInput
                                    placeholder="e.g., Sandwiches and Salad"
                                    placeholderTextColor="#8a8888"
                                    className="border-[1px] p-3 border-gray-400 rounded-lg"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                />
                                {errors.typefood && (
                                    <Text className="text-red-500 mt-1">
                                        {errors.typefood.type === 'required' && 'Food Name is required*'}
                                    </Text>
                                )}
                            </View>
                        )}
                        rules={{ required: true }}
                    />
                </View>

                <View>
                    <Controller
                        name="quantity"
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View className="mb-4">
                                <Text className="text-base font-semibold mb-2">Quantity</Text>
                                <TextInput
                                    placeholder="e.g., 138"
                                    placeholderTextColor="#8a8888"
                                    className="border-[1px] p-3 border-gray-400 rounded-lg"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                />
                                {errors.quantity && (
                                    <Text className="text-red-500 mt-1">
                                        {errors.quantity.type === 'required' && 'Quantity is required*'}
                                    </Text>
                                )}
                            </View>
                        )}
                        rules={{ required: true }}
                    />
                </View>

                <View>
                    <Controller
                        name="time"
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View className="mb-4">
                                <Text className="text-base font-semibold mb-2">Pick-up Time</Text>
                                <Pressable
                                    onPress={showTimePicker}
                                    className="border-[1px] p-3 border-gray-400 rounded-lg">
                                    <Text className="text-base">
                                        {value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'e.g., 2:00 PM'}
                                    </Text>
                                </Pressable>
                                {showPicker && (
                                    <DateTimePicker
                                        value={value ? new Date(value) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={(event, selectedTime) => {
                                            setShowPicker(false);
                                            if (selectedTime) {
                                                onChange(selectedTime.toISOString());
                                            }
                                        }}
                                    />
                                )}
                                {errors.time && (
                                    <Text className="text-red-500 mt-1">
                                        {errors.time.type === 'required' && 'Pick-up Time is required*'}
                                    </Text>
                                )}
                            </View>
                        )}
                        rules={{ required: true }}
                    />
                </View>

                <View>
                    <MapView
                        style={{ height: 200, borderRadius: 10 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>

                <TouchableOpacity
                    className="bg-green-600 p-4 rounded-full mt-6"
                    onPress={handleSubmit(submit)} >
                    <Text className="text-white font-bold text-center text-lg">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default FoodListing;
