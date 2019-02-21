import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import App from './App';

describe('App', () => {
  it('renders View', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(View)).toHaveLength(3);
  });
});
