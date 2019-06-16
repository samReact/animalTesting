import React from 'react';
import { Container, Content } from 'native-base';
import { Route } from 'react-router-native';
import ScannerPage from './ScannerPage';
import HomePage from './HomePage';
import * as routes from '../constant/routes';
import FooterComponent from './FooterComponent';
import FollowUs from './FollowUs';
import AllProductsPage from './AllProductsPage';
import HeaderComponent from './HeaderComponent';

const Home = () => (
  <Container>
    <HeaderComponent />
    <Content
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <Route exact path={routes.SCANNER} component={ScannerPage} />
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.FOLLOW_US} component={FollowUs} />
      <Route path={routes.ALL_PRODUCTS} component={AllProductsPage} />
    </Content>
    <FooterComponent />
  </Container>
);

export default Home;
