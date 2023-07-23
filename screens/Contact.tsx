import React from "react";
import { View,Text, StyleSheet, Touchable, TouchableOpacity, Linking} from "react-native";
const Cont=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.fake_card}>  
            <Text style={[styles.txt,{color:'black',marginBottom:5}]}>Contact Me!</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#003d99'}]}onPress={()=>{Linking.openURL("https://github.com/Saboten758")}}><Text style={[styles.txt]}>Github</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}onPress={()=>{Linking.openURL("mailto:debjitdaw03@gmail.com")}}><Text style={styles.txt}>Gmail</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#ff0000'}]}onPress={()=>{Linking.openURL("https://saboten123.itch.io")}}><Text style={[styles.txt,{color:'black'}]}>itch.io</Text></TouchableOpacity>
            </View>
            </View>
            <Text style={{color:'black',margin:10}}>Saboten</Text>
            
        </View>
    )
}

export default Cont;

const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
    },
    txt:{
        color:'white',
        fontWeight:'bold'
    },
    fake_card:{
        elevation:3,
        backgroundColor:'white',
        opacity:0.4,
        alignItems:'center',
        justifyContent:'center',
        height:100,
        width:200,
        borderRadius:20,
    },
    button:{
        backgroundColor:'purple',
        borderRadius:10,
        padding:7,
        opacity:1,
        margin:5,
    }
}
)