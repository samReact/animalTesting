import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableOpacity, Image, WebView } from 'react-native';
import { View, Icon, Text, Container, Content } from 'native-base';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

const clickLogo = require('../assets/click_here.png');

class ReportingModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    const { icon, url, link } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setModalVisible(true);
        }}
      >
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
            <TouchableOpacity
              iconLeft
              transparent
              onPress={() => this.setModalVisible(false)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="chevron-left"
                  style={{ color: '#000', fontSize: 45 }}
                  type="MaterialCommunityIcons"
                />
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#66C3AE',
                      fontSize: 18,
                    }}
                  >
                    RETOUR
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Content
              contentContainerStyle={{
                flex: 1,
              }}
            >
              <WebView
                source={{ uri: url }}
                style={{ marginTop: 100 }}
                scrollEnabled="false"
                javaScriptEnabled
              />
            </Content>
            <FooterComponent />
          </Container>
        </Modal>
        {link ? (
          <Image source={clickLogo} />
        ) : (
          <Image
            source={{ uri: icon }}
            style={{ height: 40, width: 40, marginRight: 20 }}
          />
        )}
      </TouchableOpacity>
    );
  }
}

ReportingModal.propTypes = {
  icon: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  link: PropTypes.bool,
};
ReportingModal.defaultProps = {
  link: false,
};

export default ReportingModal;
