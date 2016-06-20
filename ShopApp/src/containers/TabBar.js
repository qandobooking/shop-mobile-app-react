import React, { Component } from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight
} from 'react-native';
import {switchTab} from '../actions/tabs';

class TabBar extends Component {

  onPress(page){
    console.info("pressed", page);
    this.props.switchTab(page);
  }

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return (
      <View style={[styles.tab, this.props.tabStyle]} key={page}>
        {
          /*
        <Icon.Button key={'tab_'+page}  name="home" backgroundColor="black" colo onPress={()=>this.onPress(page)}>
          {name}
        </Icon.Button>
        {
        */
        }

        <TouchableHighlight onPress={()=>this.onPress(page)}>

        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
        {name}
        </Text>
        </TouchableHighlight>

        
    </View>);
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.underlineHeight,
      backgroundColor: this.props.underlineColor,
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
      </View>
    );
  }
}

TabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
  underlineColor: React.PropTypes.string,
  underlineHeight: React.PropTypes.number,
  backgroundColor: React.PropTypes.string,
  activeTextColor: React.PropTypes.string,
  inactiveTextColor: React.PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: View.propTypes.style,
};

TabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  underlineColor: 'navy',
  backgroundColor: null,
  underlineHeight: 4,
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});


function mapStateToProps(state) {
  return {
    selectedTab: state.tabs.selected,
  };
}

export default connect(mapStateToProps, {
  switchTab,
})(TabBar);
