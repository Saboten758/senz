import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Accel from "../screens/Accel";
import Magno from "../screens/Magno";
import Gyro from "../screens/Gyro";
import CustomTabBar from "./CustomTab";
import Files from "../screens/Files";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Accel" component={Accel} />
      <Tab.Screen name="Magno" component={Magno} />
      <Tab.Screen name="Gyro" component={Gyro} />
      <Tab.Screen name="Files" component={Files} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
