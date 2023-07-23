import React, { useEffect, useState } from "react";
import { Dimensions,ToastAndroid, processColor,ScrollView,StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { magnetometer, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";
import RNFS from 'react-native-fs';
import {LineChart} from 'react-native-charts-wrapper';

setUpdateIntervalForType(SensorTypes.magnetometer, 300);


const Magno=()=>{

    const filePath=`${RNFS.DocumentDirectoryPath}/magno_data.csv`;

    const showInfo=()=>{
      ToastAndroid.show(`Magno Data saved successfully to ${RNFS.DocumentDirectoryPath} `,ToastAndroid.SHORT)
    }
    const [but,setBut]=useState(false)
    const [magno,setmagno]=useState({x:0,y:0,z:0,timestamp:0})
    const [magnoDatax, setmagnoDatax] = useState([0]);
    const [magnoDatay, setmagnoDatay] = useState([0]);
    const [magnoDataz, setmagnoDataz] = useState([0]);
    const [width,setWidth]=useState(Dimensions.get('window').width)
    const [timing,setTiming]=useState([0])

    useEffect(()=>{
      const handle=async()=>{
          const width=Dimensions.get('window').width;
          setWidth(width);
      }
      Dimensions.addEventListener('change',handle);
    })

    useEffect(() => {
        const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
          if(but){
            const corrected={
              x:Number(x.toFixed(3)),
              y:Number(y.toFixed(3)),
              z:Number(z.toFixed(3)),
            }
            setmagno({ x:corrected.x, y:corrected.y, z:corrected.z, timestamp });
            setmagnoDatax((prevData) => [...prevData, x]);
            setmagnoDatay((prevData) => [...prevData, y]);
            setmagnoDataz((prevData) => [...prevData, z]);
            setTiming((prev)=>[...prev,timestamp]);
          } 
        });
        
        return () => {
          subscription.unsubscribe(); 
        };
      }, [but]);

    const save=async()=>{
        try{
            const csvString=magnoDatax.map((xVal,index)=>{
              const timestamp=timing[index];
              const yVal=magnoDatay[index];
              const zVal=magnoDataz[index];
              return `${timestamp},${xVal},${yVal},${zVal}`
            })
            const csvData="Timestamp,xVal,yVal,zVal\n"+csvString.join('\n');
            RNFS.writeFile(filePath,csvData,'utf8');
            showInfo();
        }
        catch(e){
          console.log(e);
        }
    }
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.chart_containeer}>
                <LineChart
            style={[styles.chart,{width:width}]}
            data={{
              dataSets: [{ label: "MAGNO_X", values: magnoDatax.map((xVal, index) => ({ y: xVal, x: index })), config: {lineWidth: 4}},
              { label: "MAGNO_Y", values: magnoDatay.map((yVal, index) => ({ y: yVal, x: index })), config: {lineWidth: 4,color:processColor('red')}},
              { label: "MAGNO_Z", values: magnoDataz.map((zVal, index) => ({ y: zVal, x: index })), config: {lineWidth: 4,color:processColor('green')}}
            ],
            }}
          />
                </View>
           
            <Text style={styles.text}>MAGNO_X: {magno.x}</Text>
                 <Text style={styles.text}>MAGNO_Y: {magno.y}</Text>
                <Text style={styles.text}>MAGNO_Z: {magno.z}</Text>
               <Text style={styles.text}>TIMESTAMP: {magno.timestamp}</Text>
              <TouchableHighlight style={!but?styles.button:styles.button2}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>{!but?"Start Logging":"Stop Logging"}</Text></TouchableHighlight> 
              <View style={{flexDirection:'row'}}>
              <TouchableHighlight style={styles.button3}onPress={()=>{
                setmagno({x:0,y:0,z:0,timestamp:0});setmagnoDatax([0]);setmagnoDatay([0]);setmagnoDataz([0]);
                }}>
                    <Text style={{color:'white'}}>CLEAR</Text>
                </TouchableHighlight> 
                <TouchableHighlight onPress={save}style={styles.button4}><Text>SAVE</Text></TouchableHighlight>
                </View>
         </View>
        </ScrollView>
            
    )
}
export default Magno;

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