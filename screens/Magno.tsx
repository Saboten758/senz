import React, { useEffect, useState } from "react";
import { ScrollViewComponent,ScrollView,StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { magnetometer, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";

import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.magnetometer, 100);


const Magno=()=>{
    const [but,setBut]=useState(false)
    const [magno,setMagno]=useState({x:0,y:0,z:0,timestamp:0})

    useEffect(() => {
        const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
          if(but){
            setMagno({ x, y, z, timestamp });
              
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
            data={{dataSets:[{label: "Magnometer", values: [{y:magno.x},{y:magno.y},{y:magno.z}] } ] }}/>
                </View>
           
            <Text style={styles.text}>magno_x: {magno.x}</Text>
                 <Text style={styles.text}>magno_y: {magno.x}</Text>
                <Text style={styles.text}>magno_z: {magno.x}</Text>
               <Text style={styles.text}>TIMESTAMP: {magno.timestamp}</Text>
              <TouchableHighlight style={styles.button}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>HEWWO</Text></TouchableHighlight> 
         </View>
        </ScrollView>
            
    )
}
export default Magno;

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