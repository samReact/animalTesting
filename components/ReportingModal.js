import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  Text,
  View,
} from 'react-native';

const logoWhite = require('../assets/Logo_Animal_Testing_V2.png');

class ReportingModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    const { icon } = this.props;

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
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              <Text>Page de signalement</Text>
            </TouchableOpacity>
          </View>
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
