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
import ProductPageBis from './ProductPageBis';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

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
    const { links } = this.props;
    const { loading } = this.state;
    const { manifest } = Constants;
    this.setState({ loading: true });
    setTimeout(() => {
      if (loading) {
        source.cancel();
      }
    }, 10000);
    await axios({
      method: 'GET',
      url: `https://animaltesting.fr/${links}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'User-Agent': `Appli Animal Testing/${manifest.version}`,
        'Content-Type': 'application/json; charset=utf-8',
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
