import React from 'react';
import { Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Icon, Text, Content, View, H2 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withRouter } from 'react-router-native';
import Logo from '../assets/Logo_Animal_Testing.png';
import * as routes from '../constant/routes';
import AllProductsPage from './AllProductsPage';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataItem, history, resetData } = this.props;
    const {
      image_url,
      brand_name,
      product_name,
      status_image_url,
      status_text,
      labels_at,
      categories,
      quantity,
      update_date,
      comment_at,
      alert_image_url,
      links_url,
    } = dataItem[0];
    return (
      <Content style={{ flex: 1 }}>
        <View>
          <Button iconLeft transparent onPress={() => resetData()}>
            <Icon name="arrow-back" />
            <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
              <Text>RETOUR</Text>
              <Text>1 résultat trouvé</Text>
            </View>
          </Button>
        </View>
        <View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image
              source={{ uri: image_url }}
              style={{ width: 100, height: 130 }}
            />
            <View
              style={{
                paddingLeft: 10,
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                {product_name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: status_image_url }}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={{ paddingLeft: 10, color: '#707070' }}>
                  {status_text}
                </Text>
              </View>
              <Text style={{ color: '#707070' }}>{quantity}</Text>
              <Text style={{ color: '#707070' }}>
                Mise à jour le {update_date}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {labels_at !== 'one-voice' ? (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                }}
              >
                {labels_at.map((label, index) => (
                  <Image
                    key={index}
                    source={{ uri: label }}
                    style={{ height: 30, width: 30, marginRight: 20 }}
                  />
                ))}
              </View>
            ) : null}
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}
            >
              <Image
                source={{ uri: alert_image_url }}
                style={{ height: 30, width: 30, marginRight: 20 }}
              />
            </View>
          </View>
          {links_url ? (
            <View style={{ backgroundColor: '#b7b7b7' }}>
              <AllProductsPage links={links_url} />
            </View>
          ) : null}
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require('../assets/Logo_Animal_Testing.png')}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: 10,
                }}
              >
                COMMENTAIRE SUR LA MARQUE
              </Text>
            </View>
            <Text>{comment_at}</Text>
          </View>
        </View>
      </Content>
    );
  }
}

export default withRouter(ProductPage);
