/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';


import ShopHome from './components/ShopHome';
import ServicesList from './components/ServicesList';
import UserProfile from './components/UserProfile';


class ShopApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab : 'shopTab'
    }
  }

  render() {
    return (
      <TabBarIOS>

        <TabBarIOS.Item
          title="Shop"
          selected={this.state.selectedTab === 'shopTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'shopTab',
            });
          }}>
          <ShopHome/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Servizi"
          selected={this.state.selectedTab === 'servicesTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'servicesTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <ServicesList/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          title="Profilo"
          selected={this.state.selectedTab === 'userTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'userTab',
              presses: this.state.presses + 1
            });
          }}>
          <UserProfile/>
        </TabBarIOS.Item>
      </TabBarIOS> 
      
    );
  }
}



AppRegistry.registerComponent('ShopApp', () => ShopApp);
