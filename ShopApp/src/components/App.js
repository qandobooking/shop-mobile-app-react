import React, { Component } from 'react';
import {
  TabBarIOS
} from 'react-native';

import ShopHome from './ShopHome';
import ServicesList from './ServicesList';
import UserProfile from './UserProfile';

export default class App extends Component {
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
