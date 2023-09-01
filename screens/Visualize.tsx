import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Visualize=()=>{
    const nav=useNavigation()
    return(
        <View style={styles.conatainer}>
            <Text style={styles.txt}>Graph Visualization!</Text>
            <TouchableOpacity onPress={()=>{nav.navigate("Accelerometer")}} style={styles.button3}><Text>Accelerometer</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button3}><Text>Gyroscope</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button3}><Text>Magnetometer</Text></TouchableOpacity>
        </View>
    )
}


export default Visualize;
const styles=StyleSheet.create({
    conatainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    txt:{
        color:"black",
        fontSize:20
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

})