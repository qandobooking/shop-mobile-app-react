import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadShop } from '../actions/shop';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  ActivityIndicatorIOS,
} from 'react-native';

import Spinner from '../components/Spinner'

class ShopHome extends Component {
  componentWillMount() {
    this.props.loadShop();
  }

  render() {
    const { shop, isFetching, error } = this.props;

    if (isFetching && !shop) {
      return <View style={styles.spinner}><Spinner/></View>;
    }

    if (!shop) {
      return null;
    }

    const { logoUrl, technologies } = shop.customData;

    return (
      <View style={styles.container}>
        <View style={styles.shopTitleContainer}>
          <Text style={styles.shopTitleText}>{shop.name}</Text>
        </View>
        <Image
          style={styles.logo}
          source={{uri: logoUrl}}
        />
        {this.renderTechnologiesList()}
      </View>
    );
  }

  renderTechnologiesList() {
    const { technologies } = this.props.shop.customData;

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
    backgroundColor: '#fff',
  },
  shopTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  shopTitleText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
  listContainer: {
    flex: 1,
  },
  technologyRow: {
    flexDirection: 'row',
    //justifyContent: 'left',
    //alignItems: 'left',
    padding: 20,
    //backgroundColor: '#ccc'
  },
  technologyImage: {
    resizeMode: 'contain',
    width: 100,
    height: 100
  },
  technologyInfoContainer: {
    flex: 1
  },
  technologyTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  technologyDescription: {
    textAlign: 'left',
  },
});

function mapStateToProps(state, ownProps) {
  return {
    shop: state.shop.data,
    isFetching: state.shop.isFetching,
    error: state.shop.error,
  };
}

export default connect(mapStateToProps, {
  loadShop,
})(ShopHome);
