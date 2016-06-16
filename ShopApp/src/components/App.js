import React, { Component } from 'react';
import Tabs from "./Tabs";
import {
  View,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  Text
} from 'react-native';


export default class App extends Component {
  constructor(props){
    super(props);
    
  }

  render() {
    return (
      <Navigator
          style={styles.container}
          initialRoute={{}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
          
      />
    )
  }
 

  renderScene (route, navigator){

      if(route.detail){
        return (
          <View style={styles.container}>
            <View style={styles.button} >
            <TouchableHighlight onPress={() => navigator.pop()} >
              <Text>Back</Text>
            </TouchableHighlight>
            </View>
          </View>
        )
      }

      return (

        <Tabs navigator={navigator}/>
      )
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  button : {
    height : 38,
    padding : 100
     
  }
});

