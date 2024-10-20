import { useNavigation } from '@react-navigation/native';
import { MessageSquare, MoveLeft, Map, PhoneCall } from 'lucide-react-native';
import { Image, Text, View, TouchableOpacity } from 'react-native';

const details = [
    { id: 1, package: "Food Package 1", item: "Vegetables and Fruits", time: "3:00-5:00pm", date: "Today" },
    { id: 2, package: "Food Package 1", item: "Vegetables and Fruits", time: "3:00-5:00pm", date: "Today" },
    { id: 3, package: "Food Package 1", item: "Vegetables and Fruits", time: "3:00-5:00pm", date: "Today" },
    { id: 4, package: "Food Package 1", item: "Vegetables and Fruits", time: "3:00-5:00pm", date: "Today" },
]

const Details = () => {
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-white w-full">
            <View className="px-6 border-b-[1px] border-gray-300">
                <View className="mt-10 py-4 flex-row items-center justify-between">
                    <Image source={require('../assets/images/icon.png')} />
                    <Image source={require('../assets/images/bell.png')} className="w-8 h-8" />
                </View>
            </View>
            <View className="p-6">
                <MoveLeft className="text-black" size={40} onPress={() => navigation.push('DonerHome')} />
            </View>
            <View className="flex items-center gap-4">
                <Image source={require('../assets/images/res.jpg')} className="w-[150px] h-[150px] rounded-full" />
                <Text className="text-2xl font-bold">Restaurant Name</Text>
                <View className="flex flex-row justify-around w-full px-6 gap-2">
                    <TouchableOpacity className="flex flex-col items-center w-28 py-2 bg-[#659667] rounded-lg">
                        <PhoneCall className="text-white" size={40} />
                        <Text className="text-white font-medium text-base">Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-col items-center w-28 py-2 bg-[#659667] rounded-lg">
                        <MessageSquare className="text-white" size={40} />
                        <Text className="text-white font-medium text-base">Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-col items-center w-28 py-2 bg-[#659667] rounded-lg">
                        <Map className="text-white" size={40} />
                        <Text className="text-white font-medium text-base">Open Maps</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text className="text-2xl font-bold px-6 py-4">Available Pickups</Text>
            <View className="flex-col justify-between items-center bg-white rounded-xl shadow-gray-500 px-6 gap-2">
                {details.map((detail) => (
                    <TouchableOpacity key={detail.id}>
                        <View className="flex flex-col">
                            <Text className="font-semibold text-lg">{detail.package} - {detail.item}</Text>
                            <Text className="text-gray-400 font-semibold">{detail.time}, {detail.date}</Text>
                            <View className="bg-gray-300 h-[1px] mt-2"></View>
                        </View>
                    </TouchableOpacity>
                ))}
                <View className="w-full">
                    <TouchableOpacity className="mt-5 bg-[#659667] rounded-full items-center px-3 py-2">
                        <Text className="text-white font-semibold text-lg">Sign up for pickups</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Details;
