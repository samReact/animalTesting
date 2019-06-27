import React from 'react';
import {
  FlatList,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  View,
  Icon,
  Content,
  Segment,
  Button,
  Spinner,
} from 'native-base';
import { withRouter } from 'react-router-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Constants } from 'expo';
import base64 from 'react-native-base64';
import CryptoJS from 'crypto-js';
import ProductPageBis from './ProductPageBis';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { SECRET_KEY, BASE_URL, TIMEOUT } from '../constant/env';

const { CancelToken } = axios;
const source = CancelToken.source();

const az = require('../assets/tri_a-z.png');
const za = require('../assets/tri_z-a.png');

class AllProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      filteredProduct: {},
      loading: false,
      testedProducts: false,
      NonTestedProducts: true,
      modalVisible: false,
      sorted: false,
    };
  }

  getProducts = async () => {
    const timeout = global.config.timeout * 1000;
    const { links } = this.props;
    const { loading } = this.state;
    const { manifest } = Constants;
    const { url } = global.config;
    const fullUrl = `${url || BASE_URL}/${links}`;
    const digest = CryptoJS.HmacSHA256(fullUrl, SECRET_KEY).toString();
    const signature = base64.encode(digest);
    this.setState({ loading: true });
    setTimeout(() => {
      if (loading) {
        source.cancel();
      }
    }, timeout || TIMEOUT);
    await axios({
      method: 'GET',
      url: fullUrl,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'User-Agent': `Appli Animal Testing/${manifest.version}`,
        'Content-Type': 'application/json; charset=utf-8',
        Authentication: signature,
      },
      cancelToken: source.token,
    })
      .then(res => {
        this.setState({
          loading: false,
          products: res.data.data,
          filteredProduct: res.data.data,
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        if (error.response.status === 403) {
          return Alert.alert('Erreur', 'Accès interdit', [
            {
              text: 'OK',
              onPress: () => this.setModalVisible(false),
            },
          ]);
        }
        if (error.response.status === 404) {
          return Alert.alert('Erreur', 'Aucun produit trouvé', [
            {
              text: 'OK',
              onPress: () => this.setModalVisible(false),
            },
          ]);
        }
        if (error.response.status === 406) {
          return Alert.alert('Erreur', 'Erreur du champs Accept', [
            {
              text: 'OK',
              onPress: () => this.setModalVisible(false),
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
                onPress: () => this.setModalVisible(false),
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
                onPress: () => this.setModalVisible(false),
              },
            ]
          );
        }
        return Alert.alert('Erreur', 'Aucun produit trouvé', [
          {
            text: 'OK',
            onPress: () => this.setModalVisible(false),
          },
        ]);
      });
    const { products } = this.state;
    if (products.length) {
      this.handleNonTestedProducts();
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleTestedProducts = () => {
    const { products } = this.state;
    this.setState({ loading: true });
    const filteredProduct = products.filter(
      product => product.status_tested !== '2'
    );
    this.setState({
      loading: false,
      filteredProduct,
      testedProducts: true,
      NonTestedProducts: false,
    });
  };

  handleNonTestedProducts = () => {
    const { products } = this.state;
    this.setState({ loading: true });
    const filteredProduct = products.filter(
      product => product.status_tested === '2'
    );

    this.setState({
      loading: false,
      filteredProduct,
      testedProducts: false,
      NonTestedProducts: true,
    });
  };

  handleSort = () => {
    const { filteredProduct, sorted } = this.state;
    const sortedList = filteredProduct.sort((a, b) =>
      a.brand_name < b.brand_name
        ? a.brand_name.localeCompare(b.brand_name)
        : b.brand_name.localeCompare(a.brand_name)
    );
    this.setState({
      filteredProduct: sortedList,
      sorted: !sorted,
    });
  };

  render() {
    const {
      products,
      testedProducts,
      NonTestedProducts,
      filteredProduct,
      modalVisible,
      loading,
      sorted,
    } = this.state;
    const { categories } = this.props;

    return (
      <Button
        full
        primary
        style={{
          borderRadius: 10,
          margin: 4,
        }}
        onPress={() => this.setModalVisible(true)}
      >
        <Modal
          animationType="slide"
          onShow={() => this.getProducts()}
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <HeaderComponent />
          <Content padder style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                iconLeft
                transparent
                onPress={() => this.setModalVisible(false)}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    name="chevron-left"
                    style={{ color: '#000', fontSize: 45 }}
                    type="MaterialCommunityIcons"
                  />
                  <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#66C3AE',
                        fontSize: 18,
                      }}
                    >
                      RESULTATS
                    </Text>
                    <Text>
                      {filteredProduct.length || 0} produit(s) trouvé(s)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {filteredProduct.length > 1 && (
                <View style={{ marginRight: 25 }}>
                  <TouchableOpacity
                    transparent
                    onPress={() => this.handleSort()}
                  >
                    <Image
                      source={sorted ? za : az}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Segment
              style={{
                marginTop: 10,
                marginBottom: 10,
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Button
                first
                active={NonTestedProducts}
                onPress={() => this.handleNonTestedProducts()}
              >
                <Text>Produits non-testés</Text>
              </Button>
              <Button
                last
                active={testedProducts}
                onPress={() => this.handleTestedProducts()}
              >
                <Text>Produits testés</Text>
              </Button>
            </Segment>
            {loading ? (
              <View>
                <Spinner />
              </View>
            ) : (
              <ScrollView keyboardShouldPersistTaps="handled">
                {products.length && (
                  <FlatList
                    keyExtractor={item => item.product_code}
                    data={filteredProduct}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          marginTop: 10,
                          borderWidth: 0.5,
                          borderColor: '#909090',
                        }}
                      />
                    )}
                    renderItem={({ item }) => <ProductPageBis item={item} />}
                  />
                )}
              </ScrollView>
            )}
          </Content>
          <FooterComponent />
        </Modal>
        <Text style={{ textAlign: 'center' }}>
          {' '}
          Voir tous les produits {categories.toUpperCase()} non testés
        </Text>
      </Button>
    );
  }
}

AllProductsPage.propTypes = {
  links: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
};

export default withRouter(AllProductsPage);
