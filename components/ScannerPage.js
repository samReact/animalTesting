import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
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
    Alert.alert(
      `Le code barre avec un type: ${type} et donnée ${data} à été scanné !`
    );
  };

  render() {
    const { hasCameraPermission } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {hasCameraPermission ? (
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
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
