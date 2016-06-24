import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ListView,
  ActivityIndicatorIOS,
  Animated,
  Easing,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Spinner from '../components/Spinner'
import { appTheme, rowStyle } from '../styles/themes'



const currentDimensions = Dimensions.get('window');
const winHeight = currentDimensions.height;
const headerHeight = 48;
const tabsHeight = 48.5;

const contentHeight = winHeight-headerHeight-tabsHeight

class ShopHome extends Component {

  constructor(props){
    super(props);
    this.state = {
      height : contentHeight,
      opacity: new Animated.Value(0),
      targetOpacity : 0
    }
  }

  handleScroll(evt){

    let offset = evt.nativeEvent.contentOffset.y;

    offset = offset < 0 ? 0 : offset;
    let newHeight = offset >= contentHeight / 3
        ? contentHeight /  3
        : contentHeight - offset * 2;

    this.setState({height: newHeight})

    let newOpacity = offset >= contentHeight / 6 ? 1 : 0;

    if(newOpacity != this.state.targetOpacity){
      this.setState({targetOpacity: newOpacity})
      Animated.timing(this.state.opacity, {   // and twirl
        toValue: newOpacity,
        easing:Easing.linear,
        duration: 300,
      }).start();

    }

    evt.preventDefault()

    //todo: whe should compensate height vs scroll
    /*
    if(newHeight >  contentHeight / 3) {
      this.refs.scrollView.scrollTo({y:offset*2})

    }
    */




  }

  render() {
    const { shop, isFetching, error } = this.props;

    if (isFetching && !shop) {
      return <View style={styles.spinner}><Spinner/></View>;
    }

    if (!shop) {
      return null;
    }

    const { logoUrl, technologies } = shop.homeData;

    return (
      <View style={styles.container} >

      <View style={styles.shopTitleContainer}>
            <Animated.Text style={[styles.shopTitleText, {opacity:this.state.opacity}]}>
              {shop.name.toUpperCase()}
            </Animated.Text>
            <Animated.Image
              style={[styles.logoSmall, {opacity:this.state.opacity}]}
              source={{uri: logoUrl}}
            />
      </View>

      <ScrollView
        ref="scrollView"
        scrollEventThrottle={40}
        onScroll={(evt)=>{this.handleScroll(evt)}}
        style={styles.scrollview}
        >

      <View style={styles.container}>

        <View style={[styles.logoContainer, { height:this.state.height }]} ref="logoContainer">
          <View style={[styles.innerLogoContainer]}>
          <Image
            style={styles.logo}
            source={{uri: logoUrl}}
          />
        <Text style={styles.mainTitle}>{shop.name.toUpperCase()}</Text>
        <TouchableHighlight style={styles.downIcon} onPress={()=> this.scrollABit()}>
          <Icon  name='angle-double-down' size={32} color='rgba(68,68,68,.75)'></Icon>
        </TouchableHighlight>
        </View>
        </View>

        {this.renderTechnologiesList()}
      </View>
      </ScrollView>
      </View>
    );
  }

  renderTechnologiesList() {
    const { technologies } = this.props.shop.homeData;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(technologies);

    return (
      <ListView
        style={styles.listContainer}
        dataSource={dataSource}
        renderRow={this.renderTechnologyRow}>
      </ListView>
    );
  }

  renderTechnologyRow(technology, sectionID, rowID) {
    //console.log(sectionID, rowID);
    const { title, description, imageUrl } = technology;

    const RowImage = (
      <Image
        style={styles.technologyImage}
        source={{uri: imageUrl}}
      />
    );

    const RowInfo = (
      <View style={styles.technologyInfoContainer}>
        <Text style={styles.technologyTitle}>{title}</Text>
        <Text style={styles.technologyDescription}>{description}</Text>
      </View>
    );

    if (rowID % 2  === 0) {
      return (
        <View style={styles.technologyRow}>
          {RowImage}
          {RowInfo}
        </View>
      );
    } else {
      return (
        <View style={styles.technologyRow}>
          {RowInfo}
          {RowImage}
        </View>
      );
    }
  }

  scrollABit(){
    this.refs.scrollView.scrollTo({y:winHeight})
  }

}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  shopTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    height: headerHeight,
  },
  shopTitleText: {
    fontSize: 16,
    fontFamily : 'Helvetica-Light',
    //fontWeight: '200',
    color: '#fff',
  },
  logoContainer : {
    //flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    //height: 200,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: appTheme.backgroundColor,
  },

  innerLogoContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom : winHeight/4,
    //backgroundColor: 'red',
  },
  mainTitle : {
    //flex: 1,
    color: 'white',
    fontSize:32,
    marginTop:32,
    fontFamily : 'Helvetica-Light',
    //backgroundColor: 'yellow',
  },
  downIcon : {
    top:winHeight/4,
  },
  logo: {
    //flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    //backgroundColor: 'yellow',
  },
  logoSmall: {
    position: 'absolute',
    right: 4,
    top: 8,
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  listContainer: {
    flex: 1,
    backgroundColor: appTheme.backgroundColor,
  },
  technologyRow: {
    ...rowStyle,
    flexDirection: 'row',
    //justifyContent: 'left',
    //alignItems: 'left',
    padding: 24,

  },
  technologyImage: {
    resizeMode: 'contain',
    width: 100,
    height: 100
  },
  technologyInfoContainer: {
    flex: 1,

  },
  technologyTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'left',
    color: appTheme.white,
  },
  technologyDescription: {
    textAlign: 'left',
    color: appTheme.lightWhite,
  },
});

function mapStateToProps(state) {
  return {
    shop: state.shop.data,
    isFetching: state.shop.isFetching,
    error: state.shop.error,
  };
}

export default connect(mapStateToProps)(ShopHome);
