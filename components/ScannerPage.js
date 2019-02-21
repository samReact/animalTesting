import React from 'react';
import { View } from 'react-native';
import { Permissions } from 'expo';
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
        this.setState({ loading: false, product: res.data });
      })
      .catch(err => {
        this.setState({ loading: false });
        return console.log(err);
      });
  };

  render() {
    const { hasCameraPermission, loading, product } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {hasCameraPermission ? (
          <Scanner dataItem={product.data} scan={this.handleBarCodeScanned} />
        ) : (
          <PermissionDenied />
        )}
      </View>
    );
  }
}
