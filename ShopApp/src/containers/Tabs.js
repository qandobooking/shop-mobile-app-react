import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchTab } from '../actions/tabs';
import ShopHome from './ShopHome';
import Services from './services/Services';
import Products from './products/Products';
import Gallery from './Gallery';
import UserProfile from './UserProfile';
import Contacts from './Contacts';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import {
  Text
} from 'react-native';

import TabBar from './TabBar';

const icons = ['home', 'camera-retro', 'cubes', 'phone'];

class Tabs extends Component {

  constructor(props){
    super(props);
  }
  render() {
    const { selectedTab, switchTab, navigator } = this.props;

    return (
      <ScrollableTabView
        style={{marginTop: 20, }}
        tabBarPosition='bottom'
        locked={true}
        page={this.props.selectedTab}
        renderTabBar={() => <TabBar icons={icons} />}
        >
        <ShopHome tabLabel='Home' navigator={navigator} />
        <Gallery tabLabel='Gallery' navigator={navigator} />
        {/*<Services tabLabel='Servizi' navigator={navigator} />*/}
        <Products tabLabel='Prodotti' navigator={navigator} />
        {/*<UserProfile tabLabel='Profilo' navigator={navigator} />*/}
        <Contacts tabLabel='Contatti' navigator={navigator} />

    </ScrollableTabView>
    )



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
