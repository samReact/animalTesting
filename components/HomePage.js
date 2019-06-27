import React from 'react';
import { ImageBackground } from 'react-native';
import { View, Text } from 'native-base';
import { HOME_MESSAGE, HOME_BACKGROUND } from '../constant/env';

const HomePage = () => {
  const { homeMessage, homeBackground2 } = global.config;

  return (
    <ImageBackground
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
      source={{ uri: homeBackground2 } || HOME_BACKGROUND}
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
          <Text style={{ color: '#fff', fontSize: 18 }}>
            {homeMessage || HOME_MESSAGE}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomePage;
