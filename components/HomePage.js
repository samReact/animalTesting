import React from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, H2 } from 'native-base';

const womenPic = require('../assets/image_accueil1.jpg');

const HomePage = () => (
  <ImageBackground
    resizeMode="cover"
    style={{ width: '100%', height: '100%' }}
    source={womenPic}
  >
    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
      <H2 style={{ marginBottom: 20 }}>Bienvenue !</H2>
    </View>
  </ImageBackground>
);

export default HomePage;
