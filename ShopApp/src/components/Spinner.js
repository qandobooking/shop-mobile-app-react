import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicatorIOS,
  Platform
} from 'react-native';


//var { Platform } = React;

var NativeSpinner = Platform.select({
  ios: () => require('ActivityIndicatorIOS'),
  android: () => require('ProgressBarAndroid'),
})();

const Spinner = ({}) => {
  if(Platform.OS === 'ios'){
    return(
      <NativeSpinner/>
    )
  }

  if(Platform.OS === 'android'){
    return(
      <NativeSpinner/>

    )
  }

}

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
