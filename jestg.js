const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16.3');

Enzyme.configure({ adapter: new EnzymeAdapter() });

module.exports = {
  preset: 'jest-expo',
  transform: {
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!native-base|react-router-native|react-native|expo|@expo)',
  ],
};
