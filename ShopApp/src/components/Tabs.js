import React, { Component } from 'react';
import {
  TabBarIOS
} from 'react-native';

import ShopHome from './ShopHome';
import Services from './Services';
import UserProfile from './UserProfile';

export default class Tabs extends Component {
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
          <Services navigator={this.props.navigator}/>
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
