import React from 'react';
import { Image } from 'react-native';
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
} from 'native-base';
import ScannerPage from './ScannerPage';

const logoWhite = require('../assets/Logo_Animal_Testing_White.png');

const Home = () => (
  <Container>
    <Header>
      <Left>
        <Image style={{ width: 40, height: 40 }} source={logoWhite} />
      </Left>
      <Body>
        <Title>Animal Testing</Title>
      </Body>
      <Right />
    </Header>
    <ScannerPage />
    <Footer>
      <FooterTab>
        <Button vertical>
          <Icon name="home" style={{ color: '#fff' }} />
          <Text>Accueil</Text>
        </Button>
        <Button vertical>
          <Icon name="barcode" style={{ color: '#fff' }} />
          <Text>Scanner</Text>
        </Button>
        <Button vertical>
          <Icon name="heart" style={{ color: '#fff' }} />
          <Text>Suivez nous</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
);

export default Home;
