import React, { Fragment } from 'react';
import { View, Button, Text } from 'native-base';
import { BarCodeScanner } from 'expo';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProductPage from './ProductPage';

const Scanner = ({ scan, dataItem, resetData, scanned, resetScan }) => (
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
          barCodeTypes={['ean13', 'ean8', 'code128']}
          onBarCodeScanned={scanned ? undefined : scan}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button onPress={() => resetScan()} style={{ alignSelf: 'center' }}>
            <Text>Nouveau Scan</Text>
          </Button>
        )}
      </Fragment>
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
