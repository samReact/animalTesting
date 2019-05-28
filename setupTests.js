import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// // Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() });

// Mocking expo module
jest.mock('expo');
jest.mock('axios');
