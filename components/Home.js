import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
} from 'native-base';
import { Switch, Route } from 'react-router-native';
import ScannerPage from './ScannerPage';
import HomePage from './HomePage';
import * as routes from '../constant/routes';
import FooterPage from './FooterPage';
import FollowUs from './FollowUs';

const logoWhite = require('../assets/Logo_Animal_Testing_White.png');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
        <Content contentContainerStyle={{ flex: 1 }}>
          <Switch>
            <Route exact path={routes.SCANNER} component={ScannerPage} />
            <Route path={routes.HOME} component={HomePage} />
            <Route path={routes.SCANNER} component={FollowUs} />
          </Switch>
        </Content>
        <FooterPage />
      </Container>
    );
  }
}
