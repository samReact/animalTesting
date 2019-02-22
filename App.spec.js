import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import { StyleProvider } from 'native-base';
import { NativeRouter } from 'react-router-native';
import expo, { Permissions } from 'expo';
import App from './App';
import Home from './components/Home';

// const askPermissions = jest.fn();

describe('App', () => {
  // jest.useFakeTimers();
  it('Has a StyleProvider container', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(StyleProvider)).toHaveLength(1);
  });
  it('Has a NativeRouter container', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(NativeRouter)).toHaveLength(1);
  });
  it('Render a View', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(View)).toHaveLength(1);
  });
  describe('within View', () => {
    describe('before asking permission', () => {
      it('renders no component', () => {
        const AppWrapper = shallow(<App />);
        expect(AppWrapper.find(Home)).toHaveLength(0);
      });
    });
    describe('after asking permission', () => {
      describe('when permission is granted', () => {
        Permissions.askAsync.mockResolvedValue({
          // expires: 'never',
          status: 'granted',
        });

        it('renders a Home component', done => {
          const AppWrapper = shallow(<App />);
          console.log(AppWrapper.state('hasCameraPermission'));
          setImmediate(() => {
            console.log(AppWrapper.state('hasCameraPermission'));
            expect(AppWrapper.find(Home)).toHaveLength(1);
            done();
          });
        });
      });
      // describe('when permission is denied', () => {
      //   Permissions.askAsync.mockResolvedValue({
      //     // expires: 'never',
      //     status: 'denied',
      //   });

      //   it('renders no component', done => {
      //     const AppWrapper = shallow(<App />);
      //     console.log(AppWrapper.state('hasCameraPermission'));
      //     setImmediate(() => {
      //       console.log(AppWrapper.state('hasCameraPermission'));
      //       expect(AppWrapper.find(Home)).toHaveLength(0);
      //       done();
      //     });
      //   });
      // });
    });
  });
});
