import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Permissions } from 'expo';
import ScannerPage from './components/ScannerPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCameraPermission: false };
  }

  componentDidMount() {
    this.askPermissions();
  }

  askPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasCameraPermission: true });
      Alert.alert('La permission a été accordé ');
    } else {
      Alert.alert('permission refusée');
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    return (
      <View style={styles.container}>
        {hasCameraPermission && <ScannerPage />}
      </View>
    );
  }
}
