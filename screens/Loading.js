import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeOutDown } from 'react-native-reanimated';

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DonerHome');
      // navigation.navigate('DonerHome');

      // navigation.navigate('DonerHome');

    }, 4000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

    return (
      <View className="bg-gray-200 flex-1 items-center justify-center  w-full h-full">
        <Animated.Image entering={FadeIn.duration(3000)} className="h-[100px] w-[340px]" source={require('../assets/images/large.png')} />
        
      </View>
    )
  }
  export default Loading; 