import React from 'react';
import { Image } from 'react-native';
import { withRouter } from 'react-router-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Footer,
  FooterTab,
  Text,
  View,
} from 'native-base';
import { white } from 'ansi-colors';
const logoWhite = require('../assets/Logo_Animal_Testing_White.png');

const FollowUs = () => (
  <Container>
    <Header>
      <Left>
        <Image 
          style={{ width: 40, height: 40 }} 
          source={logoWhite} />
      </Left>
      <Body>
        <Title>Animal Testing</Title>
      </Body>
      <Right />
    </Header>
    <Text 
      style={{ color: 'B66C3A2' }}>Suivez nous</Text>
    <Text 
      style={{ backgroundColor: '#B7B7B7' }}>
      Rejoignez Animal Testing sur les réseaux sociaux !
      <View 
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Button vertical>
          <Icon 
            name="link" style={{ color: white }} />
          <Text>Site</Text>
        </Button>
        <Button 
          vertical>
          <Icon 
            name="twitter" 
            style={{ color: white }} />
          <Text>Twitter</Text>
        </Button>
      </View>
      <View 
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Button vertical>
          <Icon 
            name="instagram" 
            style={{ color: white }} />
          <Text>Instagram</Text>
        </Button>
        <Button vertical>
          <Icon 
            name="social-facebook" 
            style={{ color: white }} />
          <Text>Facebook</Text>
        </Button>
      </View>
    </Text>
    <Footer>
      <FooterTab>
        <Button vertical>
          <Icon name="home" style={{ color: '#fff' }} />
          <Text>Accueil</Text>
        </Button>
        <Button 
          vertical>
          <Icon 
            name="barcode" 
            style={{ color: '#fff' }} />
          <Text>Scanner</Text>
        </Button>
        <Button 
          vertical>
          <Icon 
          name="heart" 
          style={{ color: '#fff' }} />
          <Text>Suivez-nous</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
);

export default withRouter(FollowUs);
