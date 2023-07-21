import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Accel from "../screens/Accel";
import Magno from "../screens/Magno";
import Gyro from "../screens/Gyro";

const Tab=createBottomTabNavigator();
const TabNavigator=()=>{
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            tabBarLabelPosition: "beside-icon",
            tabBarLabelStyle: {
              fontWeight: "700",
              fontSize: 15
            },
            tabBarIconStyle: { display: "none" },
          }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Accel" component={Accel} />
            <Tab.Screen name="Magno" component={Magno} />
            <Tab.Screen name="Gyro" component={Gyro} />
        </Tab.Navigator>

    )
}

export default TabNavigator;