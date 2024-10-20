import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';


const DonerDetails = () => {
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const details = [
        {id: 1, doner: "Souvik", date: "12/01/2024", time: "1 pm", food: "Mango", volunteer: "Ayush"},
        {id: 2, doner: "Souvik", date: "12/01/2024", time: "2 pm", food: "Mango", volunteer: "Ayush"},
        {id: 3, doner: "Souvik", date: "12/01/2024", time: "3 pm", food: "Mango", volunteer: "Ayush"},
        {id: 4, doner: "Souvik", date: "12/01/2024", time: "4 pm", food: "Mango", volunteer: "Ayush"},
        {id: 5, doner: "Souvik", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"}

    ]

    const detail = [
        {id: 1, name: "Donation Listing 1",  date: "12/01/2024", time: "5 pm", food: "Mango"},
        {id: 2, name: "Donation Listing 2",  date: "12/01/2024", time: "4 pm", food: "Mango"},
        {id: 3, name: "Donation Listing 3",  date: "12/01/2024", time: "3 pm", food: "Mango"},
        {id: 4, name: "Donation Listing 4",  date: "12/01/2024", time: "2 pm", food: "Mango"},
        {id: 5, name: "Donation Listing 5",  date: "12/01/2024", time: "1 pm", food: "Mango"}

    ]
    const food = [
        {id: 1, name: "Donation Listing 1", date: "12/01/2024", time: "1 pm", food: "Mango", volunteer: "Ayush"},
        {id: 2, name: "Donation Listing 1", date: "12/01/2024", time: "2 pm", food: "Mango", volunteer: "Ayush"},
        {id: 3, name: "Donation Listing 1", date: "12/01/2024", time: "3 pm", food: "Mango", volunteer: "Ayush"},
        {id: 4, name: "Donation Listing 1", date: "12/01/2024", time: "4 pm", food: "Mango", volunteer: "Ayush"},
        {id: 5, name: "Donation Listing 1", date: "12/01/2024", time: "5 pm", food: "Mango", volunteer: "Ayush"}

    ]

    const visibledetails = expanded ? details : details.slice(0,1)

    const visibledetail = open ? detail : detail.slice(0,2)

    return(
    <View className="flex-1 ">
        <View className=" bg-white px-6 ">
        <View className=" mt-10  py-4  flex-row items-center justify-between">
        <Image source={require('../assets/images/icon.png')}  />
        <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
      </View>  
      <Text className="text-4xl font-semibold pb-4">Food Donations</Text>
      </View>
      <ScrollView className=" bg-gray-200 px-6 pt-6">
        <Text className="text-2xl font-semibold mb-4">Upcoming Deliveries</Text>
        <View className="space-y-4 mb-10">
            { visibledetails.map(item => (
                <View key={item.id} className=" bg-white shadow-md  rounded-3xl p-4 ">
                <Text className="text-xl font-semibold">Food Donor Name: {item.doner}</Text>
                <View>
                <Text className="text-base ">Date: {item.date}</Text>
                <Text className="text-base ">Time: {item.time}</Text>
                <Text className="text-base ">Food: {item.food}</Text>
                <Text className="text-base ">Volunteer: {item.volunteer}</Text>
                <View className="flex flex-row w-full justify-between ">
                  <TouchableOpacity className="mt-5  bg-[#988AC7]  rounded-full items-center px-3 py-2">
                      <Text className="text-white font-semibold text-lg">
                        Contact Volunteer
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="mt-5  bg-[#988AC7]  rounded-full items-center px-3  py-2">
                      <Text className="text-white font-semibold text-lg">
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
            <Text className="text-2xl font-semibold mb-2">Current Listings</Text>

            { visibledetail.map(item => (
                <View key={item.id} className=" bg-white shadow-md  rounded-3xl p-4 ">
                <Text className="text-xl mb-3 font-semibold">{item.name}</Text>
                <Text className="text-base ">Date: {item.date}</Text>
                <Text className="text-base ">Time: {item.time}</Text>
                <Text className="text-base ">Food: {item.food}</Text>
                <TouchableOpacity className="mt-5  bg-[#659667]  rounded-full items-center px-3 py-2">
                      <Text className="text-white font-semibold text-lg">
                        Edit
                      </Text>
                </TouchableOpacity>
                </View>
            )) }
            <View className="flex justify-center items-center">
            <Text className="text-blue-600 underline font-semibold text-lg" onPress={() => setOpen(!open)}>
                            {open ? 'See Less' : 'See All'}
            </Text>
            </View>            

            <Text className="text-2xl font-semibold mb-2">Past Donations</Text>
            <View className=" bg-white rounded-3xl shadow-md p-4 space-y-4">
                <Text className="text-xl font-semibold">Donation Number</Text>
                <View>
                <Text className="text-base ">Date: </Text>
                <Text className="text-base ">Time: </Text>
                <Text className="text-base ">Food: </Text>
                <Text className="text-base ">Volunteer: </Text>
                </View>
                <TouchableOpacity className="border-2 border-[#659667] rounded-lg flex justify-center items-center p-2">
                   <Text className="text-[#659667] text-lg font-bold"> Pickup Confirmed !</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border-2 border-[#223b78] rounded-lg flex justify-center items-center p-2">
                   <Text className="text-[#223b78] text-lg font-bold"> Delivery Status is pending ...</Text>
                </TouchableOpacity>
            </View>
            <View className=" bg-white rounded-3xl shadow-md p-4 space-y-4">
                <Text className="text-xl font-semibold">Donation Number</Text>
                <View>
                <Text className="text-base ">Date: </Text>
                <Text className="text-base ">Time: </Text>
                <Text className="text-base ">Food: </Text>
                <Text className="text-base ">Volunteer: </Text>
                </View>
                <TouchableOpacity className="border-2 border-[#659667] rounded-lg flex justify-center items-center p-2">
                   <Text className="text-[#659667] text-lg font-bold"> Pickup Confirmed !</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border-2 border-[#223b78] rounded-lg flex justify-center items-center p-2">
                   <Text className="text-[#223b78] text-lg font-bold"> Delivery Confirmed !</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </ScrollView>
    
    </View>
    )
}
export default DonerDetails;