import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Contacts extends Component {



  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
        {this.renderContacts()}
      </View>
    )

  }

  renderContacts(){
    return (
      <View style={styles.contacts}>


      </View>
    )

  }
  renderMap(){
    const { shop } = this.props;
    console.info(shop)
    if(!shop || !shop.lat || !shop.lon){
      return null;
    }
    return (

      <MapView style={styles.map}
        initialRegion={{
          latitude: shop.lat,
          longitude: shop.lon,
          latitudeDelta: 0.0400,
          longitudeDelta: 0.0200,
        }}
      >
        <MapView.Marker
          coordinate={{
            longitude: shop.lon,
            latitude: shop.lat,
          }}
          title={shop.name}
          description={shop.description}
        />
    </MapView>

    )




  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
  },
  contacts: {
    flex: 1,
    
  },
});


function mapStateToProps (state){
  return {
    shop : state.shop.data
  }
}

export default connect(mapStateToProps)(Contacts)
