import React from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import { Spinner } from 'native-base';
import { Constants } from 'expo';
import Scanner from './Scanner';

const { CancelToken } = axios;
const source = CancelToken.source();

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: false,
      scanned: false,
    };
  }

  handleBarCodeScanned = async ({ data }) => {
    const { scanned, loading } = this.state;
    const { manifest } = Constants;
    await this.setState({ loading: true });

    setTimeout(() => {
      if (!scanned && loading) {
        source.cancel();
      }
    }, 10000);
    axios({
      method: 'GET',
      url: `https://animaltesting.fr/api/v1/product/${data}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'User-Agent': `Appli Animal Testing/${manifest.version}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      cancelToken: source.token,
    })
      .then(res => {
        this.setState({ loading: false, product: res.data, scanned: true });
      })
      .catch(error => {
        if (axios.isCancel()) {
          return Alert.alert('Erreur', 'Erreur technique', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false, scanned: true }),
            },
          ]);
        }
        if (error.response.status === 403) {
          return Alert.alert('Erreur', 'Accès interdit', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false, scanned: true }),
            },
          ]);
        }
        if (error.response.status === 404) {
          return Alert.alert('Erreur', 'Aucun produit trouvé', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false, scanned: true }),
            },
          ]);
        }
        if (error.response.status === 406) {
          return Alert.alert('Erreur', 'Erreur du champs Accept', [
            {
              text: 'OK',
              onPress: () => this.setState({ loading: false, scanned: true }),
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
                onPress: () => this.setState({ loading: false, scanned: true }),
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
                onPress: () => this.setState({ loading: false, scanned: true }),
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
              onPress: () => this.setState({ loading: false, scanned: true }),
            },
          ]
        );
      });
  };

  render() {
    const { loading, product, scanned } = this.state;

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
            scanned={scanned}
            resetScan={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
}
