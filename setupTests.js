// const Enzyme = require('enzyme');
// const EnzymeAdapter = require('enzyme-adapter-react-16.3');

// // Setup enzyme's react adapter
// Enzyme.configure({ adapter: new EnzymeAdapter() });

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
