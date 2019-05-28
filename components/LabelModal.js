import React, { Component } from 'react';
import { Modal, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';

class LabelModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { uri, style } = this.props;
    const { modalVisible } = this.state;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setModalVisible(true);
        }}
      >
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              <Image source={{ uri }} style={{ height: 150, width: 150 }} />
            </TouchableOpacity>
          </View>
        </Modal>
        <Image source={{ uri }} style={style} />
      </TouchableOpacity>
    );
  }
}

LabelModal.propTypes = {
  uri: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default LabelModal;
