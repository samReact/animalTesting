import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  TouchableOpacity,
  Image,
  Text,
  View,
  WebView,
  Dimensions,
} from 'react-native';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { Content } from 'native-base';

const { height, width } = Dimensions.get('window');

class ReportingModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    const { icon, url } = this.props;

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
          <HeaderComponent />
          <WebView
            source={{ uri: url }}
            style={{ width, height }}
            javaScriptEnabled
            scrollEnabled="false"
          />
          <FooterComponent />
        </Modal>
        <Image
          source={{ uri: icon }}
          style={{ height: 40, width: 40, marginRight: 20 }}
        />
      </TouchableOpacity>
    );
  }
}

ReportingModal.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default ReportingModal;
