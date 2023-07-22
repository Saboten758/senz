import React, { useEffect, useState } from "react";
import { Dimensions, processColor,ScrollView,StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { accelerometer, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";

import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.accelerometer, 300);



const Accel=()=>{
  
    const [but,setBut]=useState(false)
    const [accel,setAccel]=useState({x:0,y:0,z:0,timestamp:0})
    const [accelDatax, setAccelDatax] = useState([0]);
    const [accelDatay, setAccelDatay] = useState([0]);
    const [accelDataz, setAccelDataz] = useState([0]);
    const [dim,setDim]=useState(Dimensions.get('window').width)
    async function resizer(event) {
      const { width } = event.nativeEvent.layout;
        setDim(width);
    }
      resizer

    useEffect(()=>{
      const handleScreenResize =async () => {
        const width = Dimensions.get("window").width;
        setDim(width);
      };
      Dimensions.addEventListener("change", handleScreenResize);
  
    },[])

    useEffect(() => {
        const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
          if(but){
            const netAcceleration = {
              x: Number(x.toFixed(3)) - 0,
              y: Number(y.toFixed(3)) - 0,
              z: Number((z - 9.81).toFixed(3)),  //gravity accel =9.81 ig :>
              x_unfix:x-0,
              y_unfix:y-0,
              z_unfix:z-9.81,
            };
            setAccel({ x:netAcceleration.x, y:netAcceleration.y, z:netAcceleration.z, timestamp });
            setAccelDatax((prevData) => [...prevData, netAcceleration.x_unfix]);
            setAccelDatay((prevData) => [...prevData, netAcceleration.y_unfix]);
            setAccelDataz((prevData) => [...prevData, netAcceleration.z_unfix]);
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
            style={[styles.chart, { width: dim }]}
            data={{
              dataSets: [{ label: "ACCEL_X", values: accelDatax.map((xVal, index) => ({ y: xVal, x: index })), config: {lineWidth: 4}},
              { label: "ACCEL_Y", values: accelDatay.map((yVal, index) => ({ y: yVal, x: index })), config: {lineWidth: 4,color:processColor('red')}},
              { label: "ACCEL_Z", values: accelDataz.map((zVal, index) => ({ y: zVal, x: index })), config: {lineWidth: 4,color:processColor('green')}}
            ],
            }}
          />
                </View>
           
            <Text style={styles.text}>ACCEL_x: {accel.x}</Text>
                 <Text style={styles.text}>ACCEL_y: {accel.y}</Text>
                <Text style={styles.text}>ACCEL_z: {accel.z}</Text>
               <Text style={styles.text}>TIMESTAMP: {accel.timestamp}</Text>
              <TouchableHighlight style={!but?styles.button:styles.button2}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>{!but?"Start Logging":"Stop Logging"}</Text></TouchableHighlight> 
              <TouchableHighlight style={styles.button3}onPress={()=>{
                setAccel({x:0,y:0,z:0,timestamp:0});setAccelDatax([0]);setAccelDatay([0]);setAccelDataz([0]);
                }}>
                    <Text style={{color:'white'}}>CLEAR</Text>
                </TouchableHighlight> 
         </View>
        </ScrollView>
            
    )
}
export default Accel;

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
      }
})