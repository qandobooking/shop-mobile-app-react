import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from "./Tabs";
import { loadShop } from '../actions/shops'
import {
  View,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  Text
} from 'react-native';


class App extends Component {
  constructor(props){
    super(props);
  }


  componentWillMount() {
    this.props.loadShop()        
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



export default connect(null, {
  loadShop,
})(App);
