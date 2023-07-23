import React from "react";
import { StyleSheet, Text, View,ScrollView} from "react-native";
const Home=()=>{
    return (
      <ScrollView>
          <View style={styles.main_container}>
            <Text style={styles.texting}>WELCOME TO</Text>
            <Text style={styles.texting}>SENZ</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <View style={styles.card}>
            <Text style={styles.normal}>Welcome to the enchanting world of mobile phone sensors! These tiny, powerful components act as the mystical guardians of your device, bestowing it with extraordinary abilities. </Text>
        </View>
        <View style={styles.card2}>
            <Text style={styles.normal2}>These sensors are sophisticated electronic components integrated into your device, meticulously engineered to perceive and measure various environmental stimuli. One such marvel is the gyroscope, a micro-electromechanical system (MEMS) that senses rotational motion, enabling precise orientation detection.  </Text>
        </View>
        </View>
      </ScrollView>
    )
}

export default Home;

const styles=StyleSheet.create({
    main_container:{
        padding:10,
        justifyContent:'center',
        
    },
    card:
    {
        backgroundColor:'#ffff4d',
        alignItems:'center',
        borderRadius:20,
        marginTop:30,
        height:300,
        width:300,
        padding:10,
        justifyContent:'center',
        elevation:3,
    },
    card2:
    {
        backgroundColor:'#ff5050',
        alignItems:'center',
        borderRadius:20,
        marginTop:30,
        height:300,
        width:300,
        padding:10,
        elevation:3,
        justifyContent:'center',
    },
    texting:{
        color:'black',
        fontSize:40,
        fontWeight:'bold'
    },
    normal:{
        color:'black',
        fontSize:17
    },
    normal2:{
        color:'white',
        fontSize:17
    }
})