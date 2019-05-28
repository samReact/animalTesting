import React from 'react';
import { Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, Content, Icon, Container } from 'native-base';
import PropTypes from 'prop-types';
import Logo from '../assets/Logo_Animal_Testing.png';
import ImageModal from './ImageModal';
import ReportingModal from './ReportingModal';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LabelModal from './LabelModal';

class ProductPageBis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    const { item } = this.props;

    return (
      <TouchableOpacity onPress={() => this.setModalVisible(true)}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <Container>
            <HeaderComponent />
            <Content padder style={{ flex: 1 }}>
              <View style={{ paddingTop: 10, paddingBottom: 10 }}>
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
                        RETOUR
                      </Text>
                      <Text>1 résultat trouvé</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                  <ImageModal uri={item.image_url} />
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {item.brand_name}{' '}
                      {item.brand_name && item.product_name ? '-' : ''}{' '}
                      {item.product_name}
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
                    <Text style={{ color: '#707070' }}>{item.quantity}</Text>
                    <Text style={{ color: '#707070' }}>{item.categories}</Text>
                    <Text style={{ color: '#707070' }}>
                      {item.product_infos}
                    </Text>

                    <Text style={{ color: '#707070' }}>
                      Mise à jour le {item.update_date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {item.labels_at ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 10,
                      }}
                    >
                      {item.labels_at.slice(0, 5).map((label, index) => (
                        // <Image
                        //   key={index}
                        //   source={{ uri: label }}
                        //   style={{ height: 40, width: 40, marginRight: 10 }}
                        // />
                        <LabelModal
                          key={index}
                          uri={label}
                          style={{ height: 40, width: 40, marginRight: 10 }}
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
                    <ReportingModal icon={item.alert_image_url} />
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 40, height: 40 }} source={Logo} />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        paddingLeft: 10,
                      }}
                    >
                      COMMENTAIRE SUR LA MARQUE
                    </Text>
                  </View>
                  <Text>{item.comment_at}</Text>
                </View>
              </ScrollView>
            </Content>
            <FooterComponent />
          </Container>
        </Modal>
        <Text
          style={{
            fontWeight: 'bold',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {item.brand_name} {item.brand_name && item.product_name ? '-' : ''}{' '}
          {item.product_name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <ImageModal uri={item.image_url} />
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: item.status_image_url }}
                style={{ height: 20, width: 20 }}
              />
              <Text style={{ paddingLeft: 10, color: '#707070' }}>
                {item.status_text}
              </Text>
            </View>
            <Text style={{ color: '#707070' }}>{item.quantity}</Text>
            <Text style={{ color: '#707070' }}>{item.categories}</Text>
            <Text style={{ color: '#707070' }}>{item.product_infos}</Text>

            <Text style={{ color: '#707070' }}>
              Mise à jour le {item.update_date}
            </Text>

            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {item.labels_at.slice(0, 5).map((label, index) => (
                <LabelModal
                  key={index}
                  uri={label}
                  style={{ height: 30, width: 30, marginRight: 10 }}
                />
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ProductPageBis.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductPageBis;
