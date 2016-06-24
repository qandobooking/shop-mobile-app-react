import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadShopByDomain } from '../actions/shop';
import Tabs from "./Tabs";
import {
  StyleSheet,
  Navigator,
  View,
  StatusBar
} from 'react-native';

import FCM from 'react-native-fcm';

class App extends Component {

  constructor(props){
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }

  componentWillMount() {
    this.props.loadShopByDomain();

    FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      console.log(token)
      // store fcm token in your server
    });
    

  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
     />
      <Navigator
        style={styles.container}
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
      />
    </View>
    );
  }

  renderScene (route, navigator) {
    return <Tabs navigator={navigator} />;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});

export default connect(null, {
  loadShopByDomain
})(App);
