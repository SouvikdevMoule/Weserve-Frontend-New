import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';

export default function CharitySignup() {
  const { formState: { errors }, control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Restaurant', value: 'Restaurant' },
    { label: 'Captain', value: 'Captain' },
    { label: 'User', value: 'User' },
  ]);

  const submit = async (data) => {
    console.log('Form data:', data); // Log the form data

    try {
      const response = await fetch('http://10.0.2.2:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const text = await response.text(); 
      console.log('Raw response:', text);

      if (response.ok) {
        const result = JSON.parse(text); 
        console.log('User registered successfully:', result);
        navigation.push('Login'); 
      } else {
        console.error('Failed to register user:', text);
        alert(`Failed to register user: ${text}`);
      }
    } catch (error) {
      console.error('Network request failed:', error);
      alert('Network request failed: ' + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View className="bg-gray-200 flex-1 justify-center w-full h-full">
      <View className="w-full flex flex-col justify-center px-10">
        <Image className="mb-3" source={require('../assets/images/icon.png')} />
        <Text className="font-bold text-5xl">Register Now</Text>
        <Text className="text-black font-bold text-xl mb-2">Charity</Text>

        <Controller
          name='company'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Animated.View entering={FadeInDown.duration(1000)} className="w-full mb-1">
              <View className="bg-gray-300 p-4 rounded-lg w-full">
                <TextInput
                  placeholder='Company Name*'
                  placeholderTextColor={'#8a8888'}
                  className="text-base font-semibold"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>
              {errors.company && (
                <Text className="mb-1 font-semibold text-red-500">
                  {errors.company.type === 'required' && 'Company Name is required*'}
                </Text>
              )}
            </Animated.View>
          )}
          rules={{ required: true }}
        />

        <Controller
          name='address'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Animated.View entering={FadeInDown.duration(1000)} className="w-full mb-1">
              <View className="bg-gray-300 p-4 rounded-lg w-full">
                <TextInput
                  placeholder='Address*'
                  placeholderTextColor={'#8a8888'}
                  className="text-base font-semibold"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
              {errors.address && (
                <Text className="mb-2 font-semibold text-red-500">
                  {errors.address.type === 'required' && 'Address is required*'}
                </Text>
              )}
            </Animated.View>
          )}
          rules={{ required: true }}
        />

        <Controller
          name='type'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <View className="w-full mb-1">
              <DropDownPicker
                open={open}
                value={dropdownValue}
                items={items}
                setOpen={setOpen}
                setValue={setDropdownValue}
                setItems={setItems}
                placeholder='Type*'
                className="items-center justify-center p-4 mb-1"
                onChangeValue={(val) => {
                  onChange(val); // Update react-hook-form
                  setDropdownValue(val); // Update local state
                }}
                onClose={onBlur}
              />
              {errors.type && (
                <Text className="mb-2 font-semibold text-red-500">
                  {errors.type.type === 'required' && 'Type is required*'}
                </Text>
              )}
            </View>
          )}
          rules={{ required: true }}
        />

        <Controller
          name='email'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Animated.View entering={FadeInDown.duration(1000)} className="w-full mb-1">
              <View className="bg-gray-300 p-4 rounded-lg w-full mb-1">
                <TextInput
                  placeholder='Enter your email address*'
                  placeholderTextColor={'#8a8888'}
                  className="text-base font-semibold"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>
              {errors.email && (
                <Text className="mb-1 font-semibold text-red-500">
                  {errors.email.type === 'required' && 'Email is required*'}
                  {errors.email.type === 'pattern' && 'Invalid email address*'}
                </Text>
              )}
            </Animated.View>
          )}
          rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
        />

        <Controller
          name='password'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Animated.View entering={FadeInDown.duration(1000)} className="flex w-full mb-2">
              <View className="flex flex-row justify-between items-center bg-gray-300 p-4 rounded-lg w-full">
                <TextInput
                  placeholder='Enter your password*'
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={'#8a8888'}
                  className="font-semibold text-base"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Image
                    source={isPasswordVisible ? require('../assets/images/eye.png') : require('../assets/images/eye-off.png')}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="mb-1 font-semibold text-red-500">
                  {errors.password.type === 'required' && 'Password is required*'}
                  {errors.password.type === 'minLength' && 'Password needs to be at least 8 characters'}
                  {errors.password.type === 'maxLength' && 'Password cannot be more than 12 characters long.'}
                </Text>
              )}
            </Animated.View>
          )}
          rules={{ required: true, minLength: 8, maxLength: 12 }}
        />

        <TouchableOpacity className="w-full bg-[#415578] p-4 rounded-full" onPress={handleSubmit(submit)}>
          <Text className="text-white font-bold text-center text-xl">Sign up</Text>
        </TouchableOpacity>

        <Text className="w-full text-gray-500 font-semibold text-base text-center">
          Already have an account!! <Text className="text-blue-600" onPress={() => navigation.push('Login')}>Login</Text>
        </Text>
      </View>
    </View>
  );
}
