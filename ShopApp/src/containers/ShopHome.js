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
} from 'react-native';

import Spinner from '../components/Spinner'
import { appTheme } from '../styles/themes'

class ShopHome extends Component {

  constructor(props){
    super(props);
    this.state = {
      height : 200,
      opacity: new Animated.Value(0),
      targetOpacity : 0
    }
  }

  handleScroll(evt){

    let offset = evt.nativeEvent.contentOffset.y;
    offset = offset < 0 ? 0 : offset;
    let newHeight = offset >= 50 ? 100 : 200 - offset * 2;
    this.setState({height: newHeight})

    let newOpacity = offset >= 45 ? 1 : 0;

    if(newOpacity != this.state.targetOpacity){
      this.setState({targetOpacity: newOpacity})
      Animated.timing(this.state.opacity, {   // and twirl
        toValue: newOpacity,
        easing:Easing.linear,
        duration: 300,
      }).start();


    }

    //todo: whe should compensate height vs scroll


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
      <View style={styles.container}>
      <View style={styles.shopTitleContainer}>
          <Text style={styles.shopTitleText}>{shop.name}</Text>
            <Animated.Image
              style={[styles.logoSmall, {opacity:this.state.opacity}]}
              source={{uri: logoUrl}}
            />
      </View>
      <ScrollView
        ref="scrollView"
        style={styles.scrollview}
        scrollEventThrottle={40}
        onScroll={(evt)=>{this.handleScroll(evt)}}>
      <View style={styles.container}>

        <View style={[styles.logoContainer, { height:this.state.height }]} ref="logoContainer">
          <Image
            style={styles.logo}
            source={{uri: logoUrl}}
          />
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
    padding: 10
  },
  shopTitleText: {
    fontSize: 18,
    fontFamily : 'Helvetica-Light',
    //fontWeight: '200',
    color: '#fff',
  },
  logoContainer : {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: appTheme.backgroundColor,
  },
  logo: {
    flex: 1,
    width: 150,
    resizeMode: 'contain',
  },
  logoSmall: {
    position: 'absolute',
    right: 8,
    top: 4,
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  listContainer: {
    flex: 1,
    backgroundColor: appTheme.backgroundColor,
  },
  technologyRow: {
    flexDirection: 'row',
    //justifyContent: 'left',
    //alignItems: 'left',
    padding: 24,
    //backgroundColor: '#ccc'
    borderBottomWidth: 0.5,
    borderBottomColor: '#111',
    borderTopWidth: 0.5,
    borderTopColor: '#222',
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
    color: '#fff',
  },
  technologyDescription: {
    textAlign: 'left',
    color: '#ccc',
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
