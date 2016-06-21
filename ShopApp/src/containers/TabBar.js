import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity
} from 'react-native';
import {switchTab} from '../actions/tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabBar extends Component {

  onPress(page){
    this.props.switchTab(page);
  }

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    console.log(page)
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'normal' : 'normal';
    return (

        <TouchableOpacity style={[styles.tab, this.props.tabStyle]} key={page} onPress={()=>this.onPress(page)}>
          <Icon style={{marginTop:8}} name={this.props.icons[page]} size={18} color={textColor}></Icon>
          <Text style={[{color: textColor, fontWeight, }, textStyle, styles.tabText ]}>
            {name}
          </Text>
        </TouchableOpacity>
   )
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    console.log(this.props.tabs)
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
  activeTextColor: 'deepskyblue',
  inactiveTextColor: '#fff',
  underlineColor: 'deepskyblue',
  backgroundColor: '#000',
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
    borderTopWidth: 0.5,
    borderTopColor: '#444',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#000',
  },
  tabText : {
    fontSize : 12,
    paddingTop: 1

  }

});


function mapStateToProps(state) {
  return {
    selectedTab: state.tabs.selected,
  };
}

export default connect(mapStateToProps, {
  switchTab,
})(TabBar);
