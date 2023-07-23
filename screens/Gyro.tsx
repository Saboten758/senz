import React, { useEffect, useState } from "react";
import { Dimensions, ToastAndroid,processColor,ScrollView,StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { gyroscope, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";
import RNFS from 'react-native-fs';

import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.gyroscope, 300);

const Gyro=()=>{

  const filepath=`${RNFS.DocumentDirectoryPath}/gyroscope_data.csv`;
  const showInfo=()=>{
    ToastAndroid.show(`Gyro Data saved successfully to ${RNFS.DocumentDirectoryPath} `,ToastAndroid.SHORT)
  }
    const [but,setBut]=useState(false)
    const [gyro,setgyro]=useState({x:0,y:0,z:0,timestamp:0})
    const [gyroDatax, setgyroDatax] = useState([0]);
    const [gyroDatay, setgyroDatay] = useState([0]);
    const [gyroDataz, setgyroDataz] = useState([0]);
    const [width,setWidth]=useState(Dimensions.get('window').width);
    const[timing,setTiming]=useState([0]);

    const save=async()=>{
        try{
            const csvData=gyroDatax.map((xVal,index)=>{
              const timestamp=timing[index];
              const yVal=gyroDatay[index];
              const zVal=gyroDataz[index];
              return `${timestamp},${xVal},${yVal},${zVal}`;
            })
            const csvString="Timestamp,xVal,yVal,zVal\n"+csvData.join('\n');
            RNFS.writeFile(filepath,csvString,"utf8");
            showInfo();
        }
        catch(e){
          console.log(e);
        }

    }
    
    useEffect(()=>{
      const handle=async()=>{
        const width=Dimensions.get('window').width;
        setWidth(width);      
      }
      Dimensions.addEventListener('change',handle);
    },[])

    useEffect(() => {
        const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
          if(but){
            const corrected={
              x:Number(x.toFixed(3)),
              y:Number(y.toFixed(3)),
              z:Number(z.toFixed(3)),
            }
            setgyro({ x:corrected.x, y:corrected.y, z:corrected.z, timestamp });
            setgyroDatax((prevData) => [...prevData, x]);
            setgyroDatay((prevData) => [...prevData, y]);
            setgyroDataz((prevData) => [...prevData, z]);
            setTiming((prev)=>[...prev,timestamp]);
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
            style={[styles.chart,{width:width}]}
            data={{
              dataSets: [{ label: "GYRO_X", values: gyroDatax.map((xVal, index) => ({ y: xVal, x: index })), config: {lineWidth: 4}},
              { label: "GYRO_Y", values: gyroDatay.map((yVal, index) => ({ y: yVal, x: index })), config: {lineWidth: 4,color:processColor('red')}},
              { label: "GYRO_Z", values: gyroDataz.map((zVal, index) => ({ y: zVal, x: index })), config: {lineWidth: 4,color:processColor('green')}}
            ],
            }}
          />
                </View>
           
            <Text style={styles.text}>GYRO_X: {gyro.x}</Text>
                 <Text style={styles.text}>GYRO_Y: {gyro.y}</Text>
                <Text style={styles.text}>GYRO_Y: {gyro.z}</Text>
               <Text style={styles.text}>TIMESTAMP: {gyro.timestamp}</Text>
              <TouchableHighlight style={!but?styles.button:styles.button2}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>{!but?"Start Logging":"Stop Logging"}</Text></TouchableHighlight> 
              <View style={{flexDirection:'row'}}>
              <TouchableHighlight style={styles.button3}onPress={()=>{
                setgyro({x:0,y:0,z:0,timestamp:0});setgyroDatax([0]);setgyroDatay([0]);setgyroDataz([0]);
                }}>
                    <Text style={{color:'white'}}>CLEAR</Text>
                </TouchableHighlight> 
                <TouchableHighlight onPress={save}style={styles.button4}><Text>SAVE</Text></TouchableHighlight>
              </View>
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
})