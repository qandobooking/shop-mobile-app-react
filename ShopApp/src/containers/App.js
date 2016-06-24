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
    //dynamic contents
    this.props.loadShopByDomain();

    //notifications stuff
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log(token)
      // store fcm token in your server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      console.info("yatta", notif);
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
     console.log(token)
     // fcm token may not be available on first load, catch it here
    });
    //example topics
    //FCM.subscribeToTopic('/topics/foo-bar');
    //FCM.unsubscribeFromTopic('/topics/foo-bar');

  }

  componentWillUnmount() {
    // prevent leak
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
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
