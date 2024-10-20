// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import CharitySignup from './screens/CharitySignup';
import Loading from './screens/Loading';
import CharityHome from './screens/CharityHome';
import Title from './screens/Title';
import DonerSignup from './screens/DonerSignup';
import VolunteerSignup from './screens/VolunteerSignup';
import DonerHome from './screens/DonerHome';
import VolunteerHome from './screens/VoluneerHome';
import CharityDetails from './screens/CharityDetails';
import DonerDetails from './screens/DonerDetails';
import Details from './screens/Details';
import Logout from './screens/Logout';
import AddFood from './screens/AddFood';
import Map from './screens/Map';
import FoodListing from './screens/FoodListing';
import ManageListing from './screens/ManageListing';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Loading' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CharityHome" component={CharityHome} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="CharitySignup" component={CharitySignup} />
        <Stack.Screen name="DonerSignup" component={DonerSignup} />
        <Stack.Screen name="DonerHome" component={DonerHome} />
        <Stack.Screen name="VolunteerSignup" component={VolunteerSignup} />
        <Stack.Screen name="VolunteerHome" component={VolunteerHome} />
        <Stack.Screen name="Title" component={Title} />
        <Stack.Screen name="CharityDetails" component={CharityDetails} />
        <Stack.Screen name='DonerDetails' component={DonerDetails}/>
        <Stack.Screen name='Details' component={Details}/>
        <Stack.Screen name='Logout' component={Logout}/>
        <Stack.Screen name='AddFood' component={AddFood}/>
        <Stack.Screen name='Map' component={Map}/>
        <Stack.Screen name='FoodListing' component={FoodListing}/>
        <Stack.Screen name='ManageListing' component={ManageListing}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;