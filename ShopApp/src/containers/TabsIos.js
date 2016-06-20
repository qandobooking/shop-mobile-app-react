import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchTab } from '../actions/tabs';
import ShopHome from './ShopHome';
import Services from './services/Services';
import UserProfile from './UserProfile';
import {
  TabBarIOS
} from 'react-native';

class Tabs extends Component {
  render() {
    const { selectedTab, switchTab, navigator } = this.props;

    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Shop"
          selected={selectedTab === 'shopTab'}
          onPress={() => switchTab('shopTab')}>
          <ShopHome />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Servizi"
          selected={selectedTab === 'servicesTab'}
          onPress={() => switchTab('servicesTab')}>
          <Services navigator={navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Profilo"
          selected={selectedTab === 'userTab'}
          onPress={() => switchTab('userTab')}>
          <UserProfile />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedTab: state.tabs.selected,
  };
}

export default connect(mapStateToProps, {
  switchTab,
})(Tabs);
