import React from 'react';
import { View, Button, Text, H2 } from 'native-base';
import { BarCodeScanner } from 'expo';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import ProductPage from './ProductPage';

const barcode = require('../assets/barcode.png');

const Scanner = ({ scan, dataItem, resetData, scanned, resetScan }) => (
  <View style={{ flex: 1 }}>
    {dataItem ? (
      <ProductPage dataItem={dataItem} resetData={() => resetData()} />
    ) : (
      <BarCodeScanner
        barCodeTypes={['ean13', 'ean8', 'code128']}
        onBarCodeScanned={scanned ? undefined : scan}
        style={StyleSheet.absoluteFillObject}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
          }}
        >
          <H2 style={{ color: '#fff' }}>Scannez le code-barre</H2>
          <H2 style={{ color: '#fff' }}>d&#39;un produit cosmétique</H2>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={barcode} />
        </View>
        {scanned && (
          <Button onPress={() => resetScan()} style={{ alignSelf: 'center' }}>
            <Text>Nouveau Scan</Text>
          </Button>
        )}
      </BarCodeScanner>
    )}
  </View>
);

Scanner.propTypes = {
  scan: PropTypes.func.isRequired,
  dataItem: PropTypes.array,
  resetData: PropTypes.func.isRequired,
  scanned: PropTypes.bool.isRequired,
  resetScan: PropTypes.func.isRequired,
};
Scanner.defaultProps = {
  dataItem: undefined,
};
export default Scanner;
