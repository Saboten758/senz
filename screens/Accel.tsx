import React, { useEffect, useState } from "react";
import { Dimensions,processColor,ScrollView,StyleSheet, Text, TouchableHighlight,ToastAndroid, View,PermissionsAndroid } from "react-native";
import { accelerometer, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";
import RNFS from 'react-native-fs';

import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.accelerometer, 300);


const Accel=()=>{
    const showInfo=()=>{
      ToastAndroid.show(`Accel Data saved successfully to ${RNFS.DocumentDirectoryPath} `,ToastAndroid.SHORT)
    }
    const [but,setBut]=useState(false);
    const [accel,setAccel]=useState({x:0,y:0,z:0,timestamp:0});
    const [accelDatax, setAccelDatax] = useState([0]);
    const [accelDatay, setAccelDatay] = useState([0]);
    const [accelDataz, setAccelDataz] = useState([0]);
    const [timing,setTiming]=useState([0]);
    const [dim,setDim]=useState(Dimensions.get('window').width);


    const save = async () => {
      const filePath = `${RNFS.DocumentDirectoryPath}/accel_data.csv`; 
        console.log(RNFS.DocumentDirectoryPath);
      try {

        const csvData = accelDatax.map((xVal, index) => {
          const timestamp = timing[index];
          const yVal = accelDatay[index];
          const zVal = accelDataz[index];
          return `${timestamp},${xVal},${yVal},${zVal}`;
        });
    
        const csvString = "Timestamp,xVal,yVal,zVal\n" + csvData.join("\n");
    
        await RNFS.writeFile(filePath, csvString, "utf8");
    
        showInfo();
      } catch (error) {
        console.log("Error writing data to CSV file:", error);
      }
    };
    
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
            setTiming((prev)=>[...prev,timestamp])
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
              <View style={{flexDirection:'row'}}>
              <TouchableHighlight style={styles.button3}onPress={()=>{
                setAccel({x:0,y:0,z:0,timestamp:0});setAccelDatax([0]);setAccelDatay([0]);setAccelDataz([0]);
                }}>
                    <Text style={{color:'white'}}>CLEAR</Text>
                </TouchableHighlight> 
                <TouchableHighlight onPress={save}style={styles.button4}><Text>SAVE</Text></TouchableHighlight>
              </View>
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
    button4:{
      backgroundColor:'#666699',
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