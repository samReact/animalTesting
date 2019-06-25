import React from 'react';
import { shallow } from 'enzyme';
import { StyleProvider } from 'native-base';
import { NativeRouter } from 'react-router-native';
import { Permissions } from 'expo';
import App from './App';
import Home from './components/Home';

const AppWrapper = shallow(<App />);

describe('App', () => {
  beforeEach(() => {
    AppWrapper.setState({ ready: true });
  });
  it('Has a StyleProvider container', () => {
    // const AppWrapper = shallow(<App />);
    // AppWrapper.setState({ ready: true });
    expect(AppWrapper.find(StyleProvider)).toHaveLength(1);
  });
  it('Has a NativeRouter container', () => {
    expect(AppWrapper.find(NativeRouter)).toHaveLength(1);
  });
  describe('within StyleProvider', () => {
    describe('before asking permission', () => {
      it('renders no component', () => {
        expect(AppWrapper.find(Home)).toHaveLength(0);
      });
    });
    describe('after asking permission', () => {
      describe('when permission is denied', () => {
        it('renders no component', done => {
          Permissions.askAsync.mockResolvedValue({
            status: 'denied',
          });
          setImmediate(() => {
            expect(AppWrapper.find(Home)).toHaveLength(0);
            done();
          });
        });
      });
      describe('when permission is granted', () => {
        it('renders a Home component', done => {
          Permissions.askAsync.mockResolvedValue({
            status: 'granted',
          });
          AppWrapper.setState({ hasCameraPermission: true });
          setImmediate(() => {
            expect(AppWrapper.find(Home)).toHaveLength(1);
            done();
          });
        });
      });
    });
  });
});
