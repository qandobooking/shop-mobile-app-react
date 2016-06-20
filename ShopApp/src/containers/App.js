import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from "./Tabs";
import {
  StyleSheet,
  Navigator,
} from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
      />
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
