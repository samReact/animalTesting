import React from 'react';
import {
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text, View, Content, Button, Icon } from 'native-base';
import Logo from '../assets/Logo_Animal_Testing.png';
import ImageModal from './ImageModal';

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
                  <Text>RETOUR</Text>
                  <Text>1 résultat trouvé</Text>
                </View>
              </Button>
            </View>
            <ScrollView>
              <View style={{ flexDirection: 'row', padding: 10 }}>
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
                    {item.brand_name} -{item.product_name}
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
                  <Text style={{ color: '#707070' }}>{item.product_infos}</Text>

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
                {item.labels_at !== 'one-voice' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                    }}
                  >
                    {item.labels_at.slice(0, 5).map((label, index) => (
                      <Image
                        key={index}
                        source={{ uri: label }}
                        style={{ height: 40, width: 40, marginRight: 20 }}
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
                    source={{ uri: item.alert_image_url }}
                    style={{ height: 40, width: 40, marginRight: 20 }}
                  />
                </View>
              </View>

              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 40, height: 40 }} source={Logo} />
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
                <Text>{item.comment_at}</Text>
              </View>
            </ScrollView>
          </Content>
        </Modal>
        <Text
          style={{
            fontWeight: 'bold',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {item.brand_name} -{item.product_name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <ImageModal uri={item.image_url} />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: '#707070' }}>{item.quantity}</Text>
            <Text style={{ color: '#707070' }}>{item.categories}</Text>
            <Text style={{ color: '#707070' }}>{item.product_infos}</Text>

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
              {item.labels_at.slice(0, 5).map((label, index) => (
                <Image
                  key={index}
                  source={{ uri: label }}
                  style={{ height: 30, width: 30 }}
                />
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductPageBis;
