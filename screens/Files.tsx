import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

const Files = () => {
  const [fileList, setFileList] = useState([]);



  const del = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath;
      fileList.forEach(async (file) => {
        await RNFS.unlink(`${path}/${file.name}`);
      });
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
      <Text style={{color:'black',marginBottom:10}}>List of Files:</Text>
      <FlatList
        data={fileList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFileClick(item)}>
            <Text style={styles.fileItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={del}><Text style={{color:'black'}}> DELETE ALL</Text></TouchableOpacity>
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
});
