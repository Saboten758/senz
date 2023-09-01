import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from "react-native";
import TabNavigator from "./TabNav";
import Accel from "../screens/Accel";
import Gyro from "../screens/Gyro";
import Magno from "../screens/Magno";

const Stack=createNativeStackNavigator();

const Main=()=>{
    return (
        <NavigationContainer>
        <StatusBar hidden/>
        <Stack.Navigator>
        <Stack.Screen  name="Root" component={TabNavigator} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Accelerometer" component={Accel}/> 
        <Stack.Screen name="Gyroscope" component={Gyro}/>
        <Stack.Screen name="Magnetometers" component={Magno}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Main;