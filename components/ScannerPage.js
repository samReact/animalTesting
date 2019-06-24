import React from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import { Spinner } from 'native-base';
import Constants from 'expo-constants';
import base64 from 'react-native-base64';
import CryptoJS from 'crypto-js';
import Scanner from './Scanner';
import SECRET_KEY from '../constant/env';

const { CancelToken } = axios;
const source = CancelToken.source();

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: false,
    };
  }

  handleBarCodeScanned = ({ data }) => {
    const timeout = global.config.timeout * 1000;
    const { url } = global.config;
    const { loading } = this.state;
    const { manifest } = Constants;
    const fullUrl = `/api/v1/product/${data}`;
    const digest = CryptoJS.HmacSHA256(fullUrl, SECRET_KEY).toString();
    const signature = base64.encode(digest);
    this.setState({ loading: true });

    setTimeout(() => {
      if (loading) {
        source.cancel();
      }
    }, timeout || 10000);
    axios({
      method: 'GET',
      url: `${url}/api/v1/product/${data}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'User-Agent': `Appli Animal Testing/${manifest.version}`,
        'Content-Type': 'application/json; charset=utf-8',
        Authentication: signature,
      },
      cancelToken: source.token,
    })
      .then(res => {
        this.setState({ loading: false, product: res.data });
      })
      .catch(error => {
        if (axios.isCancel()) {
          return Alert.alert('Erreur', 'Erreur technique', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false }),
            },
          ]);
        }
        if (error.response.status === 403) {
          return Alert.alert('Erreur', 'Accès interdit', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false }),
            },
          ]);
        }
        if (error.response.status === 404) {
          return Alert.alert('Erreur', 'Aucun produit trouvé', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false }),
            },
          ]);
        }
        if (error.response.status === 406) {
          return Alert.alert('Erreur', 'Erreur du champs Accept', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false }),
            },
          ]);
        }
        if (error.response.status === 415) {
          return Alert.alert(
            'Erreur',
            "Le format du code barre n'est pas supporté.",
            [
              {
                text: 'OK',
                onPress: () => this.setState({ loading: false }),
              },
            ]
          );
        }
        if (error.response.status === 500 || error.response.status === 503) {
          return Alert.alert(
            'Erreur',
            'Une erreur est survenue, veuillez réessayer ultérieurement.',
            [
              {
                text: 'OK',
                onPress: () => this.setState({ loading: false }),
              },
            ]
          );
        }
        return Alert.alert(
          'Erreur',
          'Une erreur est survenue, veuillez réessayer ultérieurement.',
          [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false }),
            },
          ]
        );
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
