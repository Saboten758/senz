import React from "react";
import { Linking, StyleSheet, Text, TouchableHighlight, View } from "react-native";
const More=()=>{
    return(
        <View style={styles.containeer}>
            <TouchableHighlight style={styles.button} onPress={()=>{Linking.openURL("https://www.wikiwand.com/en/Accelerometer")}}>
                <Text style={styles.txt}>More about Accelerometers!</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={()=>{Linking.openURL("https://www.wikiwand.com/en/Gyroscope")}}>
                <Text style={styles.txt}>More about Gyroscope!</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={()=>{Linking.openURL("https://www.wikiwand.com/en/Magnetometer")}}>
                <Text style={styles.txt}>More about Magnetometers!</Text>
            </TouchableHighlight>
        </View>
    )
}

export default More;

const styles=StyleSheet.create({
    containeer:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    txt:{
        color:'white',
        fontSize:20,
    },
    button:{
        backgroundColor:'#666699',
        justifyContent:'center',
        padding:10,
        borderRadius:10,
        margin:10,
        alignItems:'center',
        
        width:200,
    },
})