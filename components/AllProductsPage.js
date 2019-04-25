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
import ProductPageBis from './ProductPageBis';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

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
    this.setState({ loading: true });
    await axios({
      method: 'GET',
      url: `https://animal-testing.fr/${links}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        UserAgent: 'Appli Animal Testing/1.0',
        ContentType: 'application/json; charset=utf-8',
      },
    })
      .then(res => {
        this.setState({
          loading: false,
          products: res.data.data,
          filteredProduct: res.data.data,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
        return Alert.alert('Erreur', 'Aucun produit trouvé');
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
            Alert.alert('Modal has been closed.');
          }}
        >
          <HeaderComponent />
          <Content padder style={{ flex: 1 }}>
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {filteredProduct.length > 1 && (
                <View style={{ marginLeft: -15, marginRight: 5 }}>
                  <TouchableOpacity
                    transparent
                    onPress={() => this.handleSort()}
                  >
                    <Image
                      source={sorted ? az : za}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              )}

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
            </View>
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
