import React from 'react';
import { Image, FlatList, ScrollView } from 'react-native';
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
      testedProducts: true,
      NonTestedProducts: false,
    };
  }

  async componentDidMount() {
    await axios
      .get('https://api.myjson.com/bins/ohsbw?pretty=1')
      .then(res => {
        this.setState({
          loading: false,
          products: res.data.data,
          filteredProduct: res.data.data,
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        return console.log(err);
      });
    this.handleTestedProducts();
  }

  handleTestedProducts = () => {
    const { products } = this.state;
    const filteredProduct = products.filter(
      product => product.status_text === 'Testé sur les animaux'
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
    } = this.state;
    return (
      <Content padder style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="arrow-back" />
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold', color: '#66C3AE' }}>
              RESULTATS
            </Text>
            <Text>{filteredProduct.length} produit(s) trouvé(s)</Text>
          </View>
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
                      source={{ url: item.image_url }}
                      style={{ width: 100, height: 130 }}
                    />
                    <View
                      style={{
                        paddingLeft: 10,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ color: '#707070' }}>{item.quantity}</Text>

                      <Text style={{ color: '#707070' }}>
                        Mise à jour le {item.update_date}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={
                            item.status_text === 'Testé sur les animaux'
                              ? redCircle
                              : greenCircle
                          }
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
                        {item.labels_at.map(label => (
                          <Image
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
    );
  }
}

export default withRouter(AllProductsPage);
