import React from 'react';
import { View, Alert } from 'react-native';
import axios from 'axios';
import { Spinner } from 'native-base';
import Scanner from './Scanner';

export default class ScannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: false,
    };
  }

  handleBarCodeScanned = ({ data }) => {
    this.setState({ loading: true });
    axios({
      method: 'GET',
      url: `https://animaltesting.fr/api/v1/product/${data}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'User-Agent': 'Appli Animal Testing/1.0',
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => {
        this.setState({ loading: false, product: res.data });
      })
      .catch(error => {
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
