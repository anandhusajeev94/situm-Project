import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme, StyleSheet, Button} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SitumPlugin from 'react-native-situm-plugin';
import {initSitumSdk} from './src/utils/situm';
import requestPermissions from './src/utils/RequestPermision';

//We will use this variable as a reference to the SDK positioning instance
let subscriptionId = 0;
//We will call this method from a <Button /> later
const startPositioning = async () => {
  console.log('Starting positioning');
  //Declare the locationOptions (empty = default parameters)
  const locationOptions = {};
  //Start positioning
  subscriptionId = SitumPlugin.startPositioning(
    (location: any) => {
      //returns location object
      console.log(JSON.stringify(location));
    },
    (status: any) => {
      //returns positioning status
      console.log(JSON.stringify(status));
    },
    (error: any) => {
      // returns an error string
      console.log(error);
    },
    locationOptions,
  );
};
//We will call this method from a <Button /> later
const stopPositioning = async () => {
  console.log('Stopping positioning');
  SitumPlugin.stopPositioning(subscriptionId, (success: any) => {
    console.log('success', success);
  });
};
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    initSitumSdk();
  }, []);
  return (
    <SafeAreaView style={[styles?.container, backgroundStyle]}>
      <Button title="request permissions" onPress={requestPermissions} />
      <Button title="start" onPress={startPositioning} />
      <Button title="stop" onPress={stopPositioning} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
