import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Spinner } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
import axios from 'axios';

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      return this.setState({ hasCameraPermission: false });
    }
    return this.setState({ hasCameraPermission: true });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ loading: true });
    axios
      .get('https://api.myjson.com/bins/bc3v0?pretty=1')
      .then(res => {
        this.setState({ loading: false });
        return console.log(res.data);
      })
      .catch(err => {
        this.setState({ loading: false });
        return console.log(err);
      });
  };

  render() {
    const { hasCameraPermission, loading } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {hasCameraPermission ? (
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
              onBarCodeScanned={this.handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              padding: 20,
            }}
          >
            <Text style={{ textAlign: 'center' }}>
              Le bon fonctionnement de l&#39;application Animal Testing
              nécessite d&#39;avoir un accès à votre appareil photo pour scanner
              les codes-barres des produits cosmétiques. Vous pouvez modifier
              cet autorisation dans les paramètres du téléphone, à la rubrique
              Applications.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
