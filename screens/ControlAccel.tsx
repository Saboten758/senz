import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View,ToastAndroid,Dimensions, TextInput, Alert} from "react-native";
import { accelerometer,gyroscope, setUpdateIntervalForType,SensorTypes } from "react-native-sensors";
import RNFS from 'react-native-fs';



const ControlAccel=()=>{
    const [inter,setInter]=useState("1000")
    setUpdateIntervalForType(SensorTypes.accelerometer, Number(inter));
    setUpdateIntervalForType(SensorTypes.gyroscope, Number(inter));

    const showInfo=()=>{
        ToastAndroid.show(`Accel Data saved successfully to ${RNFS.DocumentDirectoryPath} `,ToastAndroid.SHORT)
      }
   
      
      useEffect(()=>{
        const handleScreenResize =async () => {
          const width = Dimensions.get("window").width;
          setDim(width);
        };
        Dimensions.addEventListener("change", handleScreenResize);
    
      },[])
    const [but,setBut]=useState(false);
    const [accel,setAccel]=useState({x:0,y:0,z:0,timestamp:0});
    const [accelDatax, setAccelDatax] = useState([0]);
    const [accelDatay, setAccelDatay] = useState([0]);
    const [accelDataz, setAccelDataz] = useState([0]);

    const [gyro,setgyro]=useState({x:0,y:0,z:0,timestamp:0})
    const [gyroDatax, setgyroDatax] = useState([0]);
    const [gyroDatay, setgyroDatay] = useState([0]);
    const [gyroDataz, setgyroDataz] = useState([0]);

    const [timing,setTiming]=useState([0]);
    const [buff,setBuff]=useState("1000")

    const [custom,setCustom]=useState('')
    const [dim,setDim]=useState(Dimensions.get('window').width);

    const save = async () => {
        const filePath = `${RNFS.DocumentDirectoryPath}/${custom||'default'}.csv`;
        try {
            
          const csvData = accelDatax.map((accel_xVal, index) => {
            const timestamp = timing[index];
            const accel_yVal = accelDatay[index];
            const accel_zVal = accelDataz[index];
            const gyro_xVal=gyroDatax[index];
            const gyro_yVal=gyroDatay[index];
            const gyro_zVal=gyroDataz[index];
            

            return `${timestamp},${accel_xVal},${accel_yVal},${accel_zVal},${gyro_xVal},${gyro_yVal},${gyro_zVal}`;
          });
      
          const csvString = "Timestamp,accel_xVal,accel_yVal,accel_zVal,gyro_xVal,gyro_yVal,gyro_zVal\n" + csvData.join("\n");
      
          await RNFS.writeFile(filePath, csvString, "utf8");
        
          setgyro({x:0,y:0,z:0,timestamp:0});setgyroDatax([0]);setgyroDatay([0]);setgyroDataz([0]);setAccel({x:0,y:0,z:0,timestamp:0});
            setAccelDatax([0]);setAccelDatay([0]);setAccelDataz([0]);
          showInfo();
        } catch (error) {
          console.log("Error writing data to CSV file:", error);
        }
      };
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
        const subscription2 = gyroscope.subscribe(({ x, y, z, timestamp }) => {
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
          
            } 
          });
        
        return () => {
          subscription.unsubscribe(); 
          subscription2.unsubscribe(); 
        };
          
      }, [but]);

  

    const ch=()=>{
        let x=Number(buff)*1000
        if (x<=0){
            ToastAndroid.show("Enter a positive non-zero value!",ToastAndroid.SHORT)
        }
        else{
            ToastAndroid.show(`Logging Interval Successfully Set to ${buff} secs!`,ToastAndroid.SHORT)
            setInter(String(x))
        }
        
    }
    const del=()=>{
        Alert.alert("Delete","Are you sure that you want to delete all the data?",[
            {text:'Cancel'},
            {text:'Ok',onPress:()=>{setAccel({x:0,y:0,z:0,timestamp:0});setAccelDatax([0]);setAccelDatay([0]);setAccelDataz([0]);setgyro({x:0,y:0,z:0,timestamp:0});setgyroDatax([0]);setgyroDatay([0]);setgyroDataz([0]);}},
        ])
        
    }
    return(
    
        <View style={styles.container}>
            <View style={{flexDirection:'row',alignItems:"center",margin:10}}>
            <TextInput style={[styles.sundor,{width:200}]}  keyboardType="decimal-pad" placeholder="Logging Interval" onChangeText={setBuff}/>
            <Text style={styles.text}>   Secs</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={ch}><Text>SET</Text></TouchableOpacity>
               
            <View style={{alignItems:"center",justifyContent:'center',flexDirection:'row'}}>
            <View style={{margin:10}}><Text style={styles.text}>ACCEL_x: {accel.x}</Text>
                 <Text style={styles.text}>ACCEL_y: {accel.y}</Text>
                <Text style={styles.text}>ACCEL_z: {accel.z}</Text>
               </View>
               <View><Text style={styles.text}>GYRO_X: {gyro.x}</Text>
                 <Text style={styles.text}>GYRO_Y: {gyro.y}</Text>
                <Text style={styles.text}>GYRO_Y: {gyro.z}</Text>
              </View>
            </View>
                          <TouchableOpacity style={!but?styles.button:styles.button2}onPress={()=>{setBut(!but)}}><Text style={{color:'white'}}>{!but?"Start Logging":"Stop Logging"}</Text></TouchableOpacity> 
                          <View style={{flexDirection:'row',margin:10}}>
                          <TextInput style={styles.sundor} placeholder="Type here to change name" value={custom} onChangeText={setCustom}/>
                          <TouchableOpacity style={styles.button} onPress={()=>{setCustom("")}}><Text>DEL</Text></TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={save}style={styles.button4}><Text>SAVE</Text></TouchableOpacity>
                          <TouchableOpacity style={styles.button3} onPress={del}>
                    <Text style={{color:'white'}}>CLEAR</Text>
                </TouchableOpacity> 
        </View>
    )
}


export default ControlAccel;
const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
    },
    text:{
        color:'black',
    },
    sundor:{
        backgroundColor:'black',
        borderRadius:20,
        width:200,
        padding:10,
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
    button3:{
        backgroundColor:'red',
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