import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ToastAndroid } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker'
const Files = () => {
  const [fileList, setFileList] = useState([]);

  const showInfo=()=>{
    ToastAndroid.show("All Logged Files Deleted !",ToastAndroid.SHORT);
  }

  const open = async () => {
    try {
      const documentsDirectoryPath = RNFS.DocumentDirectoryPath;
      
      const result = await DocumentPicker.pick({
        transitionStyle:'partialCurl',
        mode:'open',
        type: [DocumentPicker.types.allFiles],
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled the document picker.');
      } else {
        console.log('Error selecting document:', error);
      }
    }
  };
  
  const del = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath;
      fileList.forEach(async (file) => {
        await RNFS.unlink(`${path}/${file.name}`);
      });
      showInfo(); 
      loadFiles(); 
    } catch (error) {
      console.log('Error deleting files:', error);
    }
  };

  const loadFiles = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath;
      const files = await RNFS.readDir(path);
      setFileList(files.filter(file=>file.name.endsWith('.csv')));
    } catch (error) {
      console.log('Error reading directory:', error);
    }
  };

  useEffect(() => {
    loadFiles(); 
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFiles(); 
    }, [])
  );

  const handleFileClick = async (file) => {
    try {
      Share.open({ url: `file://${file.path}`, title: 'Open CSV File' })
        .catch((error) => console.log('Error opening file:', error));
    } catch (error) {
      console.log('Error reading file:', error);
    }
  };

  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={open} style={styles.head}><Text style={{color:'white'}}> ALL FILES</Text></TouchableOpacity>
      <Text style={styles.normal}>Share Logged Files:</Text>
      <FlatList
        data={fileList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFileClick(item)}>
            <Text style={styles.fileItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity style={styles.bot}onPress={del}><Text style={{color:'white'}}> DELETE ALL</Text></TouchableOpacity>
      
      </View>
    </View>
  );
};

export default Files;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    fileItem: {
      fontSize: 18,
      color:'black',
      paddingVertical: 8,
    },
    normal:{
      color:'black',
      marginBottom:10
    },
    head:{
      width:100,
      height:40,
      marginEnd:10,
      justifyContent:"center",
      alignItems:'center',
      alignSelf:'flex-end',
      borderRadius:10,
      backgroundColor:'#666699'
    },
    bot:{
      borderRadius:10,
      backgroundColor:'#990000',
      justifyContent:"center",
      alignItems:'center',
      width:100,
      height:40,

    }
});
