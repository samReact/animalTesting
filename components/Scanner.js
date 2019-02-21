import React, { Component, Fragment } from 'react';
import { View } from 'native-base';
import { BarCodeScanner } from 'expo';
import { StyleSheet } from 'react-native';
import ProductPage from './ProductPage';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scan, dataItem } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {dataItem ? (
          <ProductPage dataItem={dataItem} />
        ) : (
          <Fragment>
            <View
              style={{
                zIndex: 100,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: '80%',
                  height: '50%',
                  borderColor: 'green',
                  borderWidth: 5,
                }}
              />
            </View>
            <BarCodeScanner
              onBarCodeScanned={scan}
              style={StyleSheet.absoluteFill}
            />
          </Fragment>
        )}
      </View>
    );
  }
}
