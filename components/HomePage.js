import React from 'react';
import { ImageBackground } from 'react-native';
import { View, H2 } from 'native-base';

const womenPic = require('../assets/image_accueil.jpg');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeMessage: 'Bienvenue !',
    };
  }

  async componentDidMount() {
    const { homeMessage, homeBackground } = global.config;
    this.setState({
      homeMessage,
      homeBackground,
    });
  }

  render() {
    const { homeMessage, homeBackground } = this.state;
    return (
      <ImageBackground
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
        source={{ uri: homeBackground } || womenPic}
      >
        <View
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <H2 style={{ marginBottom: 20 }}>{homeMessage}</H2>
        </View>
      </ImageBackground>
    );
  }
}

export default HomePage;
