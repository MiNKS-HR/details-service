import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Details from '../client/components/details.jsx';
import testDetails from '../db/testDetails.js'

configure({ adapter: new Adapter() });

describe('Front end tests', () => {
  test('should render Details without throwing an error', () => {
    expect(shallow(<Details details={testDetails}/>).exists());
  });

  it('should render Map without throwing an error', () => {
    const wrapper = mount(<Details details={testDetails} />);
    expect(wrapper.find('#map-container')).toHaveLength(1);
  });

  it('should render Para without throwing an error', () => {
    const wrapper = mount(<Details details={testDetails} />);
    expect(wrapper.find('.para')).toHaveLength(4);
    expect(wrapper.find('.cond-para')).toHaveLength(1);
  });
  
});
