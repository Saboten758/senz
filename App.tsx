import React, { useEffect } from "react";
import Main from "./navigators/MainNavigator";
import { PermissionsAndroid } from "react-native";

const App = () => {
  useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'Your app needs access to your device storage to save the file.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted.');
        } else {
          console.log('Storage permission denied.');
        }
      } catch (error) {
        console.warn('Error while requesting storage permission:', error);
      }
    };

    requestStoragePermission();
  }, []);

  return <Main />;
};

export default App;
