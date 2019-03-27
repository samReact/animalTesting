import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Permissions, Font } from 'expo';
import { NativeRouter } from 'react-router-native';
import { StyleProvider } from 'native-base';
import Home from './components/Home';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

const Roboto = require('native-base/Fonts/Roboto.ttf');
const RobotoMedium = require('native-base/Fonts/Roboto_medium.ttf');

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

  //loading custom fonts
  async componentDidMount() {
    await Font.loadAsync({
      Roboto,
      Roboto_medium: RobotoMedium,
    });
    this.askPermissions();
  }

  askPermissions = async () => {
    //asking user Camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasCameraPermission: true });
    } else {
      Alert.alert('permission refusée');
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <NativeRouter>
          <View style={styles.container}>
            {hasCameraPermission && <Home />}
          </View>
        </NativeRouter>
      </StyleProvider>
    );
  }
}
