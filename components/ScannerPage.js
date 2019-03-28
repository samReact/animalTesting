import React from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import Scanner from './Scanner';
import { Spinner } from 'native-base';

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        return Alert.alert('Erreur', err);
      });
  };

  render() {
    const { loading, product } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Spinner />
          </View>
        ) : (
          <Scanner
            dataItem={product.data}
            scan={this.handleBarCodeScanned}
            resetData={() => this.setState({ product: {} })}
          />
        )}
      </View>
    );
  }
}
