import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';


const CharityDetails = () => {
    const [expanded, setExpanded] = useState(false);

    const details = [
        {id: 1, doner: "Souvik", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"},
        {id: 2, doner: "Souvik", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"},
        {id: 3, doner: "Souvik", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"},
        {id: 4, doner: "Souvik", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"},
        {id: 5, doner: "Souvik", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"}

    ]

    const visibledetails = expanded ? details : details.slice(0,1)

    return(
    <View className="flex-1 ">
        <View className=" bg-white px-6 ">
        <View className=" mt-10  py-4  flex-row items-center justify-between">
        <Image source={require('../assets/images/icon.png')}  />
        <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
      </View>  
      <Text className="text-3xl font-semibold pb-4">Food Donations</Text>
      </View>
      <ScrollView className=" bg-gray-200 px-6 pt-6">
        <Text className="text-2xl font-semibold mb-2">Upcoming Deliveries</Text>
        <View className="space-y-4 mb-14">
            { visibledetails.map(item => (
                <View key={item.id} className=" bg-white shadow-md  rounded-3xl p-5 ">
                <Text className="text-xl font-semibold">Food Doner Name: {item.doner}</Text>
                <View>
                <Text className="text-base ">Date: {item.date}</Text>
                <Text className="text-base ">Time: {item.time}</Text>
                <Text className="text-base ">Food: {item.food}</Text>
                <Text className="text-base ">Volunteer: {item.volunteer}</Text>
                <View className="flex flex-row w-full justify-between ">
                  <TouchableOpacity className="mt-5  bg-[#988AC7]  rounded-full items-center w-fit p-2">
                      <Text className="text-white font-semibold text-sm">
                        Contact Volunteer
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="mt-5  bg-[#988AC7]  rounded-full items-center w-fit p-2">
                      <Text className="text-white font-semibold text-sm">
                        Report Voluunteer
                      </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="mt-5  bg-[#415578] rounded-full items-center px-3 py-2">
                      <Text className="text-white font-semibold text-lg">
                        Confirm Delivery
                      </Text>
                </TouchableOpacity>
                </View>
               </View>
            )) }
            <View className="flex justify-center items-center">
            <Text className="text-blue-600 underline font-semibold text-lg" onPress={() => setExpanded(!expanded)}>
                            {expanded ? 'See Less' : 'See All'}
            </Text>
            </View>
            <Text className="text-2xl font-semibold mb-2">Past Donations</Text>
            <View className=" bg-white rounded-3xl shadow-md p-5 space-y-4">
                <Text className="text-xl font-semibold">Donation Number</Text>
                <View>
                <Text className="text-base ">Date: </Text>
                <Text className="text-base ">Time: </Text>
                <Text className="text-base ">Food: </Text>
                <Text className="text-base ">Volunteer: </Text>
                </View>
                <TouchableOpacity className="border-2 border-[#223b78] rounded-lg flex justify-center items-center p-2">
                   <Text className="text-[#223b78] text-lg font-bold"> Delivery Confirmed !</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </ScrollView>
    </View>
    )
}
export default CharityDetails;