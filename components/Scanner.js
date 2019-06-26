import React from 'react';
import { View, Text } from 'native-base';
import { BarCodeScanner } from 'expo';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import ProductPage from './ProductPage';

const barcode = require('../assets/barcode_alpha170_v3.png');

const Scanner = ({ scan, dataItem, resetData }) => (
  <View style={{ flex: 1 }}>
    {dataItem ? (
      <ProductPage dataItem={dataItem} resetData={() => resetData()} />
    ) : (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <BarCodeScanner
          barCodeTypes={['ean13', 'ean8', 'code128']}
          onBarCodeScanned={scan}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={barcode} style={{ opacity: 0.5 }} />
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Scannez le code-barre
          </Text>
          <Text style={{ color: '#fff', fontSize: 18 }}>
            d&#39;un produit cosmétique
          </Text>
        </View>
      </View>
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
