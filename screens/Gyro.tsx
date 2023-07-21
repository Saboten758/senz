import React, { useEffect, useState } from "react";
import { processColor,ScrollView,StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { gyroscope, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";

import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.gyroscope, 300);


const Gyro=()=>{
    const [but,setBut]=useState(false)
    const [gyro,setgyro]=useState({x:0,y:0,z:0,timestamp:0})
    const [gyroDatax, setgyroDatax] = useState([0]);
    const [gyroDatay, setgyroDatay] = useState([0]);
    const [gyroDataz, setgyroDataz] = useState([0]);


    useEffect(() => {
        const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
          if(but){
            setgyro({ x, y, z, timestamp });
            setgyroDatax((prevData) => [...prevData, x]);
            setgyroDatay((prevData) => [...prevData, y]);
            setgyroDataz((prevData) => [...prevData, z]);
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
                <LineChart
            style={styles.chart}
            data={{
              dataSets: [{ label: "GYRO_X", values: gyroDatax.map((xVal, index) => ({ y: xVal, x: index })), config: {lineWidth: 4}},
              { label: "GYRO_Y", values: gyroDatay.map((yVal, index) => ({ y: yVal, x: index })), config: {lineWidth: 4,color:processColor('red')}},
              { label: "GYRO_Z", values: gyroDataz.map((zVal, index) => ({ y: zVal, x: index })), config: {lineWidth: 4,color:processColor('green')}}
            ],
            }}
          />
                </View>
           
            <Text style={styles.text}>GYRO_X: {gyro.x}</Text>
                 <Text style={styles.text}>GYRO_Y: {gyro.x}</Text>
                <Text style={styles.text}>GYRO_Y: {gyro.x}</Text>
               <Text style={styles.text}>TIMESTAMP: {gyro.timestamp}</Text>
              <TouchableHighlight style={!but?styles.button:styles.button2}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>{!but?"Start Logging":"Stop Logging"}</Text></TouchableHighlight> 
              <TouchableHighlight style={styles.button3}onPress={()=>{
                setgyro({x:0,y:0,z:0,timestamp:0});setgyroDatax([0]);setgyroDatay([0]);setgyroDataz([0]);
                }}>
                    <Text style={{color:'white'}}>CLEAR</Text>
                </TouchableHighlight> 
         </View>
        </ScrollView>
            
    )
}
export default Gyro;

const styles=StyleSheet.create({
    container:{
        margin:10,
        marginBottom:20,
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
        width:120,
    },
    button2:{
        backgroundColor:'grey',
        justifyContent:'center',
        borderRadius:10,
        margin:10,
        alignItems:'center',
        height:40,
        width:120,
    },
    button3:{
        backgroundColor:'black',
        justifyContent:'center',
        borderRadius:10,
        margin:10,
        alignItems:'center',
        height:40,
        width:120,
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