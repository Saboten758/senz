import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Accel from "../screens/Accel";
import Magno from "../screens/Magno";
import Gyro from "../screens/Gyro";
import CustomTabBar from "./CustomTab";
import Files from "../screens/Files";
import More from "../screens/More";
import Cont from "../screens/Contact";
import ControlAccel from "../screens/ControlAccel";
import Visualize from "../screens/Visualize";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Accel" component={Accel} /> */}
      <Tab.Screen name="Logger" component={ControlAccel} />
      
      {/* <Tab.Screen name="Gyro" component={Gyro} /> */}
      <Tab.Screen name="Files" component={Files} />
      <Tab.Screen name="Visuals" component={Visualize}/>
      {/* <Tab.Screen name="Magno" component={Magno} /> */}
      <Tab.Screen name="More" component={More} />
      <Tab.Screen name="Contact" component={Cont} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
