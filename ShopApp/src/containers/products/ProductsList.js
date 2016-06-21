import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadServices } from '../../actions/services';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';
import { get } from 'lodash';

import { appTheme, rowStyle } from '../../styles/themes'


class ProductsList extends Component {


  onPressButton(idx){
    let newPath = this.props.path ? this.props.path + `.items[${idx}]` : `items[${idx}]`;
    console.log(newPath, idx)
    const route = { path: newPath, title:this.props.productData.items[idx].title}
    this.props.servicesNavigator.push(route);
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let items = this.props.productData.items || [];
    let dataSource = ds.cloneWithRows(items)
    const { services, isFetching } = this.props;
    return (
      <View style={styles.container}>
      <ListView
        dataSource={dataSource}
        enableEmptySections={true}
        renderRow={(rowData, s, idx) => (
            <TouchableHighlight style={styles.row} onPress={()=>this.onPressButton(idx)}>
              <View>
              <Text style={styles.titleText}>{rowData.title}</Text>
              <Text style={styles.description}>{rowData.description}</Text>
              </View>
            </TouchableHighlight>


        )}
      >
      </ListView>

      </View>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop:64,
  },

  row: {
    ...rowStyle,
    padding: 16
  },
  title : {
    flex : 1,

  },
  titleText:{
    color: appTheme.white,
    fontSize : 18,
  },
  description : {
    flex:1,
    color: appTheme.lightWhite,
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});


function mapStateToProps(state, ownProps) {
  let productData = state.shop.data.productsData;
  if(ownProps.path){
    productData = get(productData, ownProps.path, [])
  }
  return {
    productData
  };
}


export default connect(mapStateToProps)(ProductsList);
