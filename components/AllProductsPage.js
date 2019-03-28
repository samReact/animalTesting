import React from 'react';
import { FlatList, ScrollView, Modal, Alert } from 'react-native';
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
import axios from 'axios';
import ProductPageBis from './ProductPageBis';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

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
      .catch(err => {
        this.setState({ loading: false });
        return Alert.alert('Erreur', 'Produit non trouvé');
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
      product => product.status_text !== 'Non testé sur les animaux'
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
      product => product.status_text === 'Non testé sur les animaux'
    );

    this.setState({
      loading: false,
      filteredProduct,
      testedProducts: false,
      NonTestedProducts: true,
    });
  };

  handleSort = () => {
    const { filteredProduct } = this.state;
    const sortedList = filteredProduct.sort((a, b) =>
      a.brand_name < b.brand_name
        ? a.brand_name.localeCompare(b.brand_name)
        : b.brand_name.localeCompare(a.brand_name)
    );
    this.setState({
      filteredProduct: sortedList,
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
    } = this.state;

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
            <View>
              <Button
                iconLeft
                transparent
                onPress={() => this.setModalVisible(false)}
              >
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
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ marginLeft: -15 }}>
                <Button icon transparent onPress={() => this.handleSort()}>
                  <Icon name="sort-by-alpha" type="MaterialIcons" />
                </Button>
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
                  active={testedProducts}
                  onPress={() => this.handleTestedProducts()}
                >
                  <Text>Produits testés</Text>
                </Button>
                <Button
                  last
                  active={NonTestedProducts}
                  onPress={() => this.handleNonTestedProducts()}
                >
                  <Text>Produits non-testés</Text>
                </Button>
              </Segment>
            </View>
            {loading ? (
              <View>
                <Spinner />
              </View>
            ) : (
              <ScrollView keyboardShouldPersistTaps="always">
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
        <Text> Voir tous les produits crème main NON TESTÉS</Text>
      </Button>
    );
  }
}

export default withRouter(AllProductsPage);
