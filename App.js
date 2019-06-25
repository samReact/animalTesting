import React from 'react';
import { Alert } from 'react-native';
import { Font, Permissions } from 'expo';
import { NativeRouter } from 'react-router-native';
import { StyleProvider } from 'native-base';
import axios from 'axios';
import Home from './components/Home';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

// Font required with native base theme
const Roboto = require('native-base/Fonts/Roboto.ttf');
const RobotoMedium = require('native-base/Fonts/Roboto_medium.ttf');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCameraPermission: false, ready: false };
  }

  // loading custom fonts
  async componentDidMount() {
    await Font.loadAsync({
      Roboto,
      Roboto_medium: RobotoMedium,
    });
    await axios
      .get('https://animaltesting.fr/api/admin/config.json')
      .then(res => res.data)
      .then(res => {
        global.config = res;
        this.setState({ ready: true });
      });
    this.askPermissions();
  }

  askPermissions = async () => {
    // asking user Camera permission to be able to scan bar code products
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasCameraPermission: true });
    } else {
      Alert.alert('permission refusée');
    }
  };

  render() {
    const { hasCameraPermission, ready } = this.state;

    return ready ? (
      <StyleProvider style={getTheme(commonColor)}>
        <NativeRouter>{hasCameraPermission && <Home />}</NativeRouter>
      </StyleProvider>
    ) : null;
  }
}
