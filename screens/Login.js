import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const submit = async (data) => {
    console.log("Form data:", data);

    try {
      const response = await fetch("http://10.0.2.2:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      console.log("Raw response:", text);

      if (response.ok) {
        const result = JSON.parse(text);
        console.log("Login successful:", result);

        const { token, userType, volunteer, doner } = result;
        if (volunteer?._id) {
          await AsyncStorage.setItem("id", volunteer?._id);
        } else if (doner?._id) {
          console.log("Doner", doner._id);
          await AsyncStorage.setItem("id", doner?._id);
        }

        if (token) {
          await AsyncStorage.setItem("token", token);

          if (userType === "user") {
            navigation.push("CharityHome");
          } else if (userType === "volunteer") {
            navigation.push("VolunteerHome");
          } else if (userType === "doner") {
            navigation.push("DonerHome");
          } else {
            console.error("Unknown user type");
            alert("Unknown user type");
          }
        } else {
          console.error("Token is missing in the response");
          alert("Failed to login: Invalid response from server");
        }
      } else {
        console.error("Failed to login:", text);
        alert(`Failed to login: ${text}`);
      }
    } catch (error) {
      console.error("Network request failed:", error);
      alert("Network request failed: " + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <View className="bg-gray-200 flex-1 justify-center w-full h-full">
      <View className="flex flex-col justify-center px-10 gap-2">
        <Animated.View entering={FadeInDown.duration(1000)} className="w-full">
          <Text className="font-bold text-5xl">Welcome Back !</Text>
        </Animated.View>

        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Animated.View
              entering={FadeInDown.duration(1000)}
              className="w-full mb-1"
            >
              <Text
                entering={FadeInDown.duration(1000)}
                className="text-black font-bold text-base mb-2"
              >
                Email
              </Text>
              <View className="bg-gray-300 p-4 rounded-lg w-full mb-1">
                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor={"#8a8888"}
                  className="text-base font-semibold"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>
              {errors.email && (
                <Text className="mb-1 font-semibold text-red-500">
                  {errors.email.type === "required" && "Email is required*"}
                  {errors.email.type === "pattern" && "Invalid email address*"}
                </Text>
              )}
            </Animated.View>
          )}
          rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Animated.View
              entering={FadeInDown.duration(1000)}
              className="flex w-full"
            >
              <Text className="text-black font-bold text-base mb-2 overflow-hidden">
                Password
              </Text>
              <View className="flex flex-row justify-between items-center bg-gray-300 p-4 rounded-lg w-full">
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={"#8a8888"}
                  className="font-semibold text-base"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Animated.Image
                    entering={FadeIn.duration(3000)}
                    source={
                      isPasswordVisible
                        ? require("../assets/images/eye.png")
                        : require("../assets/images/eye-off.png")
                    }
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="mb-1 font-semibold text-red-500">
                  {errors.password.type === "required" &&
                    "Password is required*"}
                  {errors.password.type === "minLength" &&
                    "Password needs to be at least 8 characters"}
                  {errors.password.type === "maxLength" &&
                    "Password cannot be more than 12 characters long."}
                </Text>
              )}
            </Animated.View>
          )}
          rules={{ required: true, minLength: 8, maxLength: 12 }}
        />

        <Animated.View
          entering={FadeInDown.duration(1000)}
          className="w-full flex justify-end"
        >
          <Text className="text-gray-500 font-bold text-base ml-auto">
            Forgot your password ?
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(1000)} className="w-full">
          <TouchableOpacity
            className="bg-gray-900 p-4 rounded-full"
            onPress={handleSubmit(submit)}
          >
            <Text className="text-gray-300 font-bold text-center text-lg">
              {" "}
              Log in
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.duration(1000)}
          className="text-gray-500 font-semibold text-center ml-auto"
        >
          Don't have an account?{" "}
          <Text
            className="text-blue-600"
            onPress={() => navigation.push("CharitySignup")}
          >
            Signup
          </Text>
        </Animated.Text>
      </View>
    </View>
  );
}
