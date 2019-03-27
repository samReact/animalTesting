import React from 'react';
import { Image, FlatList, ScrollView, Modal, Alert } from 'react-native';
import { Text, View, Icon, Content, Segment, Button } from 'native-base';
import { withRouter } from 'react-router-native';
import axios from 'axios';

const redCircle = require('../assets/red_circle.png');
const greenCircle = require('../assets/green_circle.png');

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
        console.log(res.data.data);
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

  handleTestedProducts = () => {
    const { products } = this.state;
    const filteredProduct = products.filter(
      product => product.status_text !== 'Non testé sur les animaux'
    );
    console.log(products);
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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
                  renderItem={({ item }) => (
                    <View>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        {item.product_name}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={{ uri: item.image_url }}
                          style={{ width: 100, height: 130 }}
                        />
                        <View
                          style={{
                            paddingLeft: 10,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text style={{ color: '#707070' }}>
                            {item.quantity}
                          </Text>

                          <Text style={{ color: '#707070' }}>
                            Mise à jour le {item.update_date}
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{ uri: item.status_image_url }}
                              style={{ height: 20, width: 20 }}
                            />
                            <Text style={{ paddingLeft: 10, color: '#707070' }}>
                              {item.status_text}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            {item.labels_at.map((label, index) => (
                              <Image
                                key={index}
                                source={{ uri: label }}
                                style={{ height: 30, width: 30 }}
                              />
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
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
