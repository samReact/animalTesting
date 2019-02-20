import React, { Component } from 'react';
import { View } from 'native-base';
import { BarCodeScanner } from 'expo';
import { StyleSheet } from 'react-native';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scan } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
      </View>
    );
  }
}
