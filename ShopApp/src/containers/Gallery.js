import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from  'react-native-carousel';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

import { appTheme, rowStyle } from '../styles/themes'

var { height, width } = Dimensions.get('window');

class Gallery extends Component {

  render() {
    return (
      <Carousel
        width={width}
        animate={false}
        indicatorSize={20}
        indicatorSpace={12}
        indicatorOffset={20}
        indicatorAtBottom={false}>
        {this.renderImages()}
      </Carousel>
    );
  }

  renderImages() {
    return this.props.items.map((item, index) => (
      <View style={styles.container} key={index}>
        <Image source={{ uri: item.imageUrl }} style={styles.image}>
          {(item.title || item.caption) && <View style={styles.textContainer}>
            {item.title && <Text style={styles.imageTitle}>{item.title}</Text>}
            {item.caption && <Text style={styles.imageCaption}>{item.caption}</Text>}
          </View>}
        </Image>
      </View>
    ));
  }
}

var styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    //resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageTitle: {
    color: '#fff',
    fontSize: 20
  },
  imageCaption: {
    color: '#fff',
    fontSize: 12
  }
});


const emptyList = [];
function mapStateToProps(state) {
  const { items } = state.shop.data.galleryData;
  return {
    items: items || emptyList
  };
}

export default connect(mapStateToProps)(Gallery);
