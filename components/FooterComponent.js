import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { withRouter } from 'react-router-native';
import Proptypes from 'prop-types';
import * as routes from '../constant/routes';

const FooterComponent = props => (
  <Footer>
    <FooterTab>
      <Button vertical onPress={() => props.history.push(routes.HOME)}>
        <Icon name="home" style={{ color: '#fff' }} />
        <Text>Accueil</Text>
      </Button>
      <Button vertical onPress={() => props.history.push(routes.SCANNER)}>
        <Icon name="barcode" style={{ color: '#fff' }} />
        <Text>Scanner</Text>
      </Button>
      <Button vertical onPress={() => props.history.push(routes.FOLLOW_US)}>
        <Icon name="heart" style={{ color: '#fff' }} />
        <Text>Suivez nous</Text>
      </Button>
    </FooterTab>
  </Footer>
);

FooterComponent.propTypes = {
  history: Proptypes.object.isRequired,
};

export default withRouter(FooterComponent);
