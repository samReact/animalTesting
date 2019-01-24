import React from 'react';
import { Image } from 'react-native';
import { withRouter } from 'react-router-native';

const womenPic = require('../assets/woman-comparing-prices-smartphone-drugstore-youn-her-department-supermarket-47155866.jpg');

const HomePage = () => (
  <Image
    resizeMode="cover"
    style={{ width: '100%', height: '100%' }}
    source={womenPic}
  />
);

export default withRouter(HomePage);
