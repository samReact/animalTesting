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
    const {
      image_url,
      brands,
      product_name,
      status_images_url,
      status_text,
      labels_at,
      categories,
      quantity,
      update_date,
      comment_at,
      alert_image_url,
    } = dataItem[0];
    return (
      <Grid style={{ backgroundColor: '#FEFEFE', paddingLeft: 8 }}>
        <Row style={{ height: '10%' }}>
          <Col style={{ width: '20%', padding: 4 }}>
            <Button iconLeft transparent full>
              <Icon
                name="arrow-back"
                style={{ position: 'absolute', left: -4 }}
              />
            </Button>
          </Col>
          <Col style={{ margin: 4, flexWrap: 'wrap', flexDirection: 'column' }}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 20, color: '#66C3AE' }}
            >
              RETOUR
            </Text>
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
          <Col
            style={{
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Row style={{ padding: 4 }} size={2}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  lineHeight: 20,
                  textAlign: 'left',
                }}
              >
                {`${brands} - ${product_name}`}
              </Text>
            </Row>
            <Row size={1}>
              <Image
                style={{ width: '10%', padding: 4 }}
                source={{
                  uri: status_images_url,
                }}
                alt="status_image_url"
              />
              <Text style={{ padding: 4, fontSize: 15 }}>{status_text}</Text>
            </Row>
            <Row
              style={{
                paddingLeft: 4,
                flexWrap: 'wrap',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                lineHeight: 0,
              }}
              size={3}
            >
              <Text style={{ fontSize: 15 }}>{quantity}</Text>
              <Text style={{ fontSize: 15 }}>{categories}</Text>
              <Text
                style={{ fontSize: 15 }}
              >{`mis à jour le ${update_date}`}</Text>
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            height: '15%',
            margin: 4,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Col
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              height: '90%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            {labels_at.map(label => (
              <Col style={{ width: 45, height: 45, marginRight: 2 }}>
                <Image
                  style={{ flex: 1, resizeMode: 'stretch' }}
                  source={{
                    uri: label,
                  }}
                />
              </Col>
            ))}
          </Col>
          <Col style={{ width: '15%', height: '90%' }}>
            <Image
              style={{ flex: 1, resizeMode: 'stretch' }}
              source={{
                uri: alert_image_url,
              }}
            />
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
            {comment_at}
          </Text>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(ProductPage);
