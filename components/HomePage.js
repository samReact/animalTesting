import React from 'react';
import { ImageBackground } from 'react-native';
import { View, Text } from 'native-base';

const womenPic = require('../assets/image_accueil.jpg');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeMessage: 'Bonjour !',
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
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '8%',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>{homeMessage}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default HomePage;
