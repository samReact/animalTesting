import React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import Scanner from './Scanner';
import PermissionDenied from './PermissionDenied';

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      product: {},
      loading: false,
    };
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ loading: true });
    axios
      .get(`https://animal-testing.fr/api/v1/product/${data}`)
      .then(res => {
        this.setState({ loading: false, product: res.data });
      })
      .catch(err => {
        this.setState({ loading: false });
        return console.log(err);
      });
  };

  render() {
    const { loading, product } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Scanner
          dataItem={product.data}
          scan={this.handleBarCodeScanned}
          resetData={() => this.setState({ product: {} })}
        />
      </View>
    );
  }
}
