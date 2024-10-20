import { Map, MessageSquare, MoveLeft, PhoneCall, TrophyIcon } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Logout = () => {
    return (
        <View className="flex-1 w-full bg-white">
        <View className="px-6 border-b-[1px] border-gray-300">
            <View className="mt-10 py-4 flex-row items-center justify-between">
                <Image source={require('../assets/images/icon.png')} />
                <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
            </View>
        </View>
        <ScrollView className="mb-10">
        <View className="p-6 flex flex-row w-[80%] justify-between items-center relative">
            <MoveLeft className="text-black" size={40} onPress={() => navigation.push('DonerHome')} />
            <Text className="font-bold text-2xl text-center absolute left-1/2 transform -translate-x-1/2">
                Signup Details
            </Text>
        </View>
        <View className="px-4 gap-2">
            <View className="gap-3">
                <Text className="font-semibold text-2xl">Schedule Time</Text>
                <View className="bg-gray-200 p-2 rounded-lg gap-1">
                    <Text className="font-semibold text-base">Pickup: 10:00 AM - 12:00 PM</Text>
                    <Text className="font-semibold text-base">Dropoff: 10:00 AM - 12:00 PM</Text>
                </View>
            </View> 
        </View>
        <Text className="font-semibold text-2xl px-6 py-2">Pickup Location</Text>
        <View className="mx-6 bg-green-200 p-4 rounded-lg">          
            <View className=" rounded-lg gap-1">
                    <Text className="font-semibold text-base">Restaurant Name</Text>
                    <Text className="font-semibold text-base">Restaurant address</Text>
            </View>
           <View className="flex flex-row justify-between  mt-10">
            <TouchableOpacity className="flex flex-col items-center w-[30%] py-2 bg-white shadow-md shadow-gray-500 rounded-3xl">
                <PhoneCall className="text-[#659667]" size={40} />
                <Text className="text-[#659667] font-medium text-base">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col items-center w-[30%] py-2  bg-white shadow-md shadow-gray-500 rounded-3xl">
                <MessageSquare className="text-[#659667]" size={40} />
                <Text className="text-[#659667] font-medium text-base">Message</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col items-center w-[30%] py-2  bg-white shadow-md shadow-gray-500 rounded-3xl">
                <Map className="text-[#659667]" size={40} />
                <Text className="text-[#659667] font-medium text-base">Open Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="font-semibold text-2xl px-6 py-2">Dropoff Location</Text>
        <View className="mx-6 bg-blue-200 p-4 rounded-lg">          
            <View className=" rounded-lg gap-1">
                    <Text className="font-semibold text-base">Restaurant Name</Text>
                    <Text className="font-semibold text-base">Restaurant address</Text>
            </View>
           <View className="flex flex-row justify-between  mt-10">
            <TouchableOpacity className="flex flex-col items-center w-[30%] py-2 bg-white shadow-md shadow-gray-500 rounded-3xl">
                <PhoneCall className="text-[#223b78]" size={40} />
                <Text className="text-[#223b78] font-medium text-base">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col items-center w-[30%] py-2  bg-white shadow-md shadow-gray-500 rounded-3xl">
                <MessageSquare className="text-[#223b78]" size={40} />
                <Text className="text-[#223b78] font-medium text-base">Message</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col items-center w-[30%] py-2  bg-white shadow-md shadow-gray-500 rounded-3xl">
                <Map className="text-[#223b78]" size={40} />
                <Text className="text-[#223b78] font-medium text-base">Open Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-4 gap-2 mb-10">
            <View className="gap-3">
                <Text className="font-semibold text-2xl">Schedule Time</Text>
                <View className="bg-gray-200 p-2 rounded-lg gap-1">
                    <Text className="font-semibold text-base">Pickup: 10:00 AM - 12:00 PM</Text>
                    <Text className="font-semibold text-base">Dropoff: 10:00 AM - 12:00 PM</Text>
                </View>
            </View> 
        </View>
        </ScrollView>
    </View>
    )
}
export default Logout;
