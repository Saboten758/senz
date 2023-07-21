import React, { useEffect, useState } from "react";
import { ScrollViewComponent,ScrollView,StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { gyroscope, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";

import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.gyroscope, 200);


const Gyro=()=>{
    const [but,setBut]=useState(false)
    const [gyro,setGyro]=useState({x:0,y:0,z:0,timestamp:0})

    useEffect(() => {
        const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
          if(but){
            setGyro({ x, y, z, timestamp });
              
          } 
        });
        
        return () => {
          subscription.unsubscribe(); 
        };
      }, [but]);


    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.chart_containeer}>
                <LineChart style={styles.chart}
            data={{dataSets:[{label: "Gyroscope", values: [{y:(gyro.x)},{y:gyro.y},{y:gyro.z}]} ] }}/>
                </View>
           
            <Text style={styles.text}>gyro_x: {gyro.x}</Text>
                 <Text style={styles.text}>gyro_y: {gyro.x}</Text>
                <Text style={styles.text}>gyro_z: {gyro.x}</Text>
               <Text style={styles.text}>TIMESTAMP: {gyro.timestamp}</Text>
              <TouchableHighlight style={styles.button}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>HEWWO</Text></TouchableHighlight> 
         </View>
        </ScrollView>
            
    )
}
export default Gyro;

const styles=StyleSheet.create({
    container:{
        margin:10,
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    text:{
        color:'black'
    },
    button:{
        backgroundColor:'green',
        justifyContent:'center',
        borderRadius:10,
        margin:10,
        alignItems:'center',
        height:40,
        width:100,
    },
    chart_containeer:{
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    chart: {
        flex: 1,
        height:500,
        width:500
      }
})