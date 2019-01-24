import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Permissions } from 'expo';
import { StyleProvider } from 'native-base';
import Home from './components/Home';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

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
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
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
      <StyleProvider style={getTheme(commonColor)}>
        <View style={styles.container}>{hasCameraPermission && <Home/>}</View>
      </StyleProvider>
    );
  }
}
