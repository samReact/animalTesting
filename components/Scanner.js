import React, { Fragment } from 'react';
import { View } from 'native-base';
import { BarCodeScanner } from 'expo';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProductPage from './ProductPage';

const Scanner = ({ scan, dataItem, resetData }) => (
  <View style={{ flex: 1 }}>
    {dataItem ? (
      <ProductPage dataItem={dataItem} resetData={() => resetData()} />
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

Scanner.propTypes = {
  scan: PropTypes.func.isRequired,
  dataItem: PropTypes.array,
  resetData: PropTypes.func.isRequired,
};
Scanner.defaultProps = {
  dataItem: undefined,
};
export default Scanner;
