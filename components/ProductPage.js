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
              padding: 10,
            }}
          >
            {labels_at !== 'one-voice' ? (
              <View>
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
      // <Grid style={{ backgroundColor: '#FEFEFE', paddingLeft: 8 }}>
      //   <Row style={{ height: '10%' }}>
      //     <Col style={{ width: '20%', padding: 4 }}>
      //       <Button iconLeft transparent full onPress={() => resetData()}>
      //         <Icon
      //           name="arrow-back"
      //           style={{ position: 'absolute', left: -4 }}
      //         />
      //       </Button>
      //     </Col>
      //     <Col style={{ margin: 4, flexWrap: 'wrap', flexDirection: 'column' }}>
      //       <Text
      //         style={{ fontWeight: 'bold', fontSize: 20, color: '#66C3AE' }}
      //       >
      //         RETOUR
      //       </Text>
      //     </Col>
      //   </Row>
      //   <Row style={{ height: '30%' }}>
      //     <Col style={{ width: '30%', padding: 4 }}>
      //       <Image
      //         style={{ width: '100%', height: '100%' }}
      //         source={{
      //           uri: image_url,
      //         }}
      //       />
      //     </Col>
      //     <Col
      //       style={{
      //         flexWrap: 'wrap',
      //         flexDirection: 'column',
      //         justifyContent: 'space-between',
      //       }}
      //     >
      //       <Row style={{ padding: 4 }} size={2}>
      //         <Text
      //           style={{
      //             fontWeight: 'bold',
      //             fontSize: 20,
      //             lineHeight: 20,
      //             textAlign: 'left',
      //           }}
      //         >
      //           {`${brand_name} - ${product_name}`}
      //         </Text>
      //       </Row>
      //       <Row>
      //         <Image
      //           style={{ width: 50, height: 50 }}
      //           source={{ uri: status_images_url }}
      //         />
      //         <Text style={{ padding: 4, fontSize: 15 }}>{status_text}</Text>
      //       </Row>
      //       <Row
      //         style={{
      //           paddingLeft: 4,
      //           flexWrap: 'wrap',
      //           flexDirection: 'column',
      //           justifyContent: 'flex-end',
      //           lineHeight: 0,
      //         }}
      //         size={3}
      //       >
      //         <Text style={{ fontSize: 15 }}>{quantity}</Text>
      //         <Text style={{ fontSize: 15 }}>{categories}</Text>
      //         <Text style={{ fontSize: 15 }}>
      //           {`mis à jour le ${update_date}`}
      //         </Text>
      //       </Row>
      //     </Col>
      //   </Row>
      //   <Row
      //     style={{
      //       margin: 4,
      //       paddingTop: 10,
      //       paddingBottom: 10,
      //     }}
      //   >
      //     <Col
      //       style={{
      //         flexWrap: 'wrap',
      //         flexDirection: 'row',
      //         height: '90%',
      //         justifyContent: 'space-evenly',
      //         alignItems: 'center',
      //       }}
      //     >
      //       {labels_at &&
      //         labels_at.map(label => (
      //           <Col style={{ width: 45, height: 45, marginRight: 2 }}>
      //             <Image
      //               style={{ flex: 1, resizeMode: 'stretch' }}
      //               source={{
      //                 uri: label,
      //               }}
      //             />
      //           </Col>
      //         ))}
      //     </Col>
      //     <Col style={{ width: '15%', height: '90%' }}>
      //       <Image
      //         style={{ flex: 1, resizeMode: 'stretch' }}
      //         source={{
      //           uri: alert_image_url,
      //         }}
      //       />
      //     </Col>
      //   </Row>
      //   <Row
      //     style={{ height: '10%', backgroundColor: '#B7B7B7', width: '100%' }}
      //   >
      //     <AllProductsPage links={links_url} />
      //   </Row>
      //   <Row style={{ width: '100%', height: '10%' }}>
      //     <Col style={{ width: '20%', margin: 4 }}>
      //       <Image
      //         style={{ width: '100%', marginRight: 4, height: '100%' }}
      //         source={require('../assets/Logo_Animal_Testing.png')}
      //       />
      //     </Col>
      //     <Col style={{ margin: 4 }}>
      //       <Text
      //         style={{
      //           fontWeight: 'bold',
      //           flexWrap: 'wrap',
      //           flexDirection: 'column',
      //           justifyContent: 'center',
      //         }}
      //       >
      //         COMMENTAIRE SUR LA MARQUE
      //       </Text>
      //     </Col>
      //   </Row>
      //   <Row style={{ margin: 4 }}>
      //     <Text
      //       style={{
      //         flexWrap: 'wrap',
      //         flexDirection: 'column',
      //         alignItems: 'flex-start',
      //       }}
      //     >
      //       {comment_at}
      //     </Text>
      //   </Row>
      // </Grid>
    );
  }
}

export default withRouter(ProductPage);
