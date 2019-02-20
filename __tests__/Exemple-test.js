import React from 'react';
import { shallow } from 'enzyme';
import { Container, Header, Content } from 'native-base';
import { Route } from 'react-router-native';
import Home from '../components/Home';

describe('Home', () => {
  it('it render a Container', () => {
    const AppWrapper = shallow(<Home />);
    expect(AppWrapper.find(Container)).toHaveLength(1);
  });
  describe('within Container', () => {
    it('it render a Header', () => {
      const AppWrapper = shallow(<Home />);
      expect(AppWrapper.find(Header)).toHaveLength(1);
    });
    it('it render a Content', () => {
      const AppWrapper = shallow(<Home />);
      expect(AppWrapper.find(Content)).toHaveLength(1);
    });
    describe('within Content', () => {
      const AppWrapper = shallow(<Home />);
      it('it render routes', () => {
        expect(AppWrapper.find(Route)).toHaveLength(2);
      });
    });
  });
});
