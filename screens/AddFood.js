import { Button, Layout } from "@ui-kitten/components";
import { X } from "lucide-react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView from "react-native-maps";

const AddFood = () => {
    const { formState: { errors }, control, handleSubmit } = useForm();
    const [ modalVisible, setModalVisible ] = useState(false)


    const [showPicker, setShowPicker] = useState(false);

    const showTimePicker = () => {
        setShowPicker(true);
    };

    const submit = async (data) => {
        console.log('Form data:', data); 
    };

    const onTimeChange = (event, selectedTime) => {
        setShowPicker(Platform.OS === 'ios');
        const currentTime = selectedTime || new Date();
        // Here you would format the time according to your needs
        onChange(currentTime);
    };

    return(
        <View className="flex-1 justify-center items-center">
        <View>
        <Modal
           animationType="slide"
           transparent={true}
           visible={modalVisible}
           onRequestClose={() => {
               Alert.alert('Modal has been closed.');
               setModalVisible(!modalVisible);
           } }>
           <View className="flex-1 justify-end">         
               <View className="p-4 w-full h-[70%] bg-white shadow-lg shadow-black rounded-t-3xl ">
               <TouchableOpacity
                        className="flex items-end mb-6"
                       onPress={() => setModalVisible(!modalVisible)}>
                       <X className="text-black"/>
                </TouchableOpacity>
                <View className=" gap-6">
                <View className="flex justify-center px-6 ">    
                <Text className="text-xl font-bold mb-4">Create New Food Donation Listing </Text>
                <Controller
                    name='typefood'
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <View className=" gap-2">
                        <Text className="text-base font-semibold">Type Food</Text>
                        <View className="border-[1px] p-2 border-gray-400 rounded-lg w-full">
                            <TextInput
                            placeholder='e.g, Sanwichs and Salad'
                            placeholderTextColor={'#8a8888'}
                            className="text-base font-semibold"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            />
                        </View>
                        {errors.typefood && (
                            <Text className="mb-1 font-semibold text-red-500">
                            {errors.typefood.type === 'required' && 'Food Name is required*'}
                            </Text>
                        )}
                        </View>
                    )}
                    rules={{ required: true }}
                    />
                </View>
                <View className="felx justify-center px-6">    
                <Controller
                    name='quantity'
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <View className="  gap-2">
                        <Text className="text-base font-semibold">Quantity</Text>
                        <View className="border-[1px] p-2 border-gray-400 rounded-lg w-full">
                            <TextInput
                            placeholder='138'
                            placeholderTextColor={'#8a8888'}
                            className="text-base font-semibold"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            keyboardType="numeric"
                            />
                        </View>
                        {errors.quantity && (
                            <Text className="mb-1 font-semibold text-red-500">
                            {errors.quantity.type === 'required' && 'Quantity is required*'}
                            </Text>
                        )}
                        </View>
                    )}
                    rules={{ required: true }}
                    />
                </View>
                <View className="felx justify-center px-6">    
                <Controller
                name="time"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View className="gap-2">
                        <Text className="text-base font-semibold">Pick-up Time</Text>
                        <Pressable onPress={showTimePicker} className="border-[1px] p-2 border-gray-400 rounded-lg w-full">
                            <Text className="text-base font-semibold">
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
                                        onChange(selectedTime.toISOString()); // Store as ISO string
                                    }
                                }}
                            />
                        )}

                        {errors.time && (
                            <Text className="font-semibold text-red-500">
                                {errors.time.type === 'required' && 'Pick-up Time is required*'}
                            </Text>
                        )}
                    </View>
                )}
                rules={{ required: true }}
            />
                </View>
                <TouchableOpacity className=" bg-[#659667] flex justify-center items-center   p-4 rounded-full" onPress={handleSubmit(submit)}>
                <Text className="text-white font-bold text-center text-xl">Submit</Text>
                </TouchableOpacity>
                </View>    
               </View>
           </View>
       </Modal>
       <TouchableOpacity
       className="bg-[#659667] p-3 rounded-full"
           onPress={() => setModalVisible(true)}>
               <Text className="font-semibold text-white">Show Modal</Text>
        </TouchableOpacity>
        <MapView ></MapView>
   </View>
   </View>
    )

} 

export default AddFood;