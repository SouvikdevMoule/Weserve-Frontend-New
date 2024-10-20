import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeOutDown, FadingTransition } from 'react-native-reanimated';


const Title = () => {
  const navigation = useNavigation();
    return (
      <View className="bg-white flex-1 items-center justify-center gap-2 w-full h-full">
       <Image className="h-[20%] w-[60%] items-center "   source={require('../assets/images/hello.png')} />
        <Text className="text-2xl w-[90%] text-center font-bold">Don't waste, give others a taste</Text>
        <Text className="text-2xl font-bold">GET STARTED...</Text>
        <Animated.View entering={FadeInDown.duration(1000)} className="w-full flex justify-center items-center gap-4">
        <TouchableOpacity className="w-[80%] bg-[#659667] p-4 rounded-full" onPress={() => navigation.push('DonerSignup')} >
          <Text className="text-white font-bold text-center text-2xl">I am a food donor</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[80%] bg-[#988AC7] p-4 rounded-full" onPress={() => navigation.push('VolunteerSignup')} >
          <Text className="text-white font-bold text-center text-2xl">I am a volunteer</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[80%] bg-[#415578] p-4 rounded-full" onPress={() => navigation.push('CharitySignup')}>
          <Text className="text-white font-bold text-center text-2xl">I am a charity</Text>
        </TouchableOpacity>
        </Animated.View>
        <Animated.Text entering={FadeInDown.duration(1000)} className="text-lg font-semibold">Already have an account? <Text className="text-blue-600" onPress={() => navigation.push('Login')} >Log In</Text></Animated.Text>
      </View>
    )
  }
  export default Title;