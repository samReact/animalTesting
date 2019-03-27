import React from 'react';
import { FlatList, ScrollView, Modal, Alert } from 'react-native';
import { Text, View, Icon, Content, Segment, Button } from 'native-base';
import { withRouter } from 'react-router-native';
import axios from 'axios';
import ProductPageBis from './ProductPageBis';

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
    await axios
      .get(`https://animal-testing.fr/${links}`)
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
    const filteredProduct = products.filter(
      product => product.status_text !== 'Non testé sur les animaux'
    );
    this.setState({
      filteredProduct,
      testedProducts: true,
      NonTestedProducts: false,
    });
  };

  handleNonTestedProducts = () => {
    const { products } = this.state;
    const filteredProduct = products.filter(
      product => product.status_text === 'Non testé sur les animaux'
    );

    this.setState({
      filteredProduct,
      testedProducts: false,
      NonTestedProducts: true,
    });
  };

  render() {
    const {
      products,
      testedProducts,
      NonTestedProducts,
      filteredProduct,
      modalVisible,
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
          <Content padder style={{ flex: 1 }}>
            <View>
              <Button
                iconLeft
                transparent
                onPress={() => this.setModalVisible(false)}
              >
                <Icon name="arrow-back" />
                <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                  <Text>RESULTATS</Text>
                  <Text>
                    {filteredProduct.length || 0} produit(s) trouvé(s)
                  </Text>
                </View>
              </Button>
            </View>

            <Segment style={{ marginTop: 10, marginBottom: 10 }}>
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
            <ScrollView>
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
          </Content>
        </Modal>
        <Text> Voir tous les produits crème main NON TESTÉS</Text>
      </Button>
    );
  }
}

export default withRouter(AllProductsPage);
