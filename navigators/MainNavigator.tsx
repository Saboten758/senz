import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from "react-native";
import TabNavigator from "./TabNav";

const Stack=createNativeStackNavigator();

const Main=()=>{
    return (
        <NavigationContainer>
        <StatusBar hidden/>
        <Stack.Navigator>
        <Stack.Screen  name="Root" component={TabNavigator} options={{
            headerShown:false
        }}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Main;