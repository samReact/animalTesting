import React, { Component } from 'react';
import { Modal, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

class ImageModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { uri } = this.props;
    const { modalVisible } = this.state;

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
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <Image
              source={{ uri }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </Modal>
        <Image source={{ uri }} style={{ width: 100, height: 180 }} />
      </TouchableOpacity>
    );
  }
}

ImageModal.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default ImageModal;
