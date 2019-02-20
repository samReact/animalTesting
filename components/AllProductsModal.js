import React, { Component } from 'react';
import { Modal, TouchableHighlight, Alert } from 'react-native';
import { Text, View, Button } from 'native-base';

class AllProductsModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <Button
        full
        style={{
          backgroundColor: '#66C3AE',
          borderRadius: 10,
          margin: 4,
          height: 'auto',
        }}
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
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Text> Voir tous les produits crème main NON TESTÉS</Text>
      </Button>
    );
  }
}

export default AllProductsModal;
