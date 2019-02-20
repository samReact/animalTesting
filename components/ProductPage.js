import React from 'react';
import { Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withRouter } from 'react-router-native';
import Logo from '../assets/Logo_Animal_Testing.png';
import * as routes from '../constant/routes';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataItem, history } = this.props;
    const { image_url } = dataItem[0];
    return (
      <Grid style={{ backgroundColor: '#FEFEFE', paddingLeft: 8 }}>
        <Row style={{ height: '10%' }}>
          <Col style={{ width: '20%', padding: 4 }}>
            <Button iconLeft white full>
              <Icon
                name="arrow-back"
                style={{ position: 'absolute', left: -4 }}
              />
            </Button>
          </Col>
          <Col style={{ margin: 4, flexWrap: 'wrap', flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold' }}>RETOUR</Text>
            <Text>Crème main</Text>
          </Col>
        </Row>
        <Row style={{ height: '30%' }}>
          <Col style={{ width: '30%', padding: 4 }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: image_url,
              }}
            />
          </Col>
          <Col style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
            <Row style={{ padding: 4 }} size={2}>
              <Text style={{ fontWeight: 'bold' }}>
                brand_name - product_name
              </Text>
            </Row>
            <Row size={1}>
              <Image
                style={{ width: '10%', padding: 4 }}
                source={{
                  uri:
                    'https://pngimage.net/wp-content/uploads/2018/06/pastille-rouge-png.png',
                }}
                alt="status_image_url"
              />
              <Text style={{ fontWeight: 'bold', padding: 4 }}>
                testé sur les animaux
              </Text>
            </Row>
            <Row
              style={{
                padding: 4,
                flexWrap: 'wrap',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              size={3}
            >
              <Text>75ml</Text>
              <Text>soin du corps/shampoing cheveux</Text>
              <Text>mis à jour le 19 mars 2018 </Text>
            </Row>
          </Col>
        </Row>
        <Row style={{ height: '10%', padding: 4 }}>
          <Col style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            <Image
              style={{ width: '20%', height: '90%' }}
              source={{
                uri:
                  'http://les3sources.com/wp-content/uploads/sites/119/2018/05/vegan-society-label-PNG-300x239-300x239.png',
              }}
            />
            <Image
              style={{ width: '20%', resizeMode: 'cover' }}
              source={{
                uri:
                  'https://banner2.kisspng.com/20180408/uuw/kisspng-cruelty-free-animal-testing-logo-organization-peop-exam-5acae23f0c19c0.1984684415232456310496.jpg',
              }}
            />
            <Image
              style={{ width: '20%', margin: 4 }}
              source={{
                uri:
                  'https://www.avril-beaute.fr/img/cms/Logo/peta_cruelty_free.png',
              }}
            />
          </Col>
          <Col style={{ width: '20%', height: '10%' }}>
            <TouchableOpacity style={{ width: '20%', height: '10%' }}>
              <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={require('../assets/danger.png')}
              />
            </TouchableOpacity>
          </Col>
        </Row>
        <Row
          style={{ height: '10%', backgroundColor: '#B7B7B7', width: '100%' }}
        >
          <Button
            full
            style={{
              backgroundColor: '#66C3AE',
              borderRadius: 10,
              margin: 4,
              height: 'auto',
            }}
            onPress={() => history.push(routes.ALL_PRODUCTS)}
          >
            <Text> Voir tous les produits crème main NON TESTÉS</Text>
          </Button>
        </Row>
        <Row style={{ width: '100%', height: '10%' }}>
          <Col style={{ width: '20%', margin: 4 }}>
            <Image
              style={{ width: '100%', marginRight: 4, height: '100%' }}
              source={require('../assets/Logo_Animal_Testing.png')}
            />
          </Col>
          <Col style={{ margin: 4 }}>
            <Text
              style={{
                fontWeight: 'bold',
                flexWrap: 'wrap',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              COMMENTAIRE SUR LA MARQUE
            </Text>
          </Col>
        </Row>
        <Row style={{ margin: 4 }}>
          <Text
            style={{
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.E
          </Text>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(ProductPage);
