import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Details from '../client/components/details';
import testDetails from '../db/testDetails';

configure({ adapter: new Adapter() });

describe('Front end rendering tests', () => {
  const wrapper = mount(<Details details={testDetails} />);
  it('should render Details without throwing an error', () => {
    expect(wrapper.exists());
  });

  it('should render Map without throwing an error', () => {
    expect(wrapper.find('#map-container')).toHaveLength(1);
  });

  it('should render Para without throwing an error', () => {
    expect(wrapper.find('.para')).toHaveLength(4);
    expect(wrapper.find('.cond-para')).toHaveLength(1);
  });
});

describe('Front end clicking tests,', () => {
  const wrapper = mount(<Details details={testDetails} />);
  it('should expand paragraph on click', () => {
    expect(wrapper.find('.cond-para')).toHaveLength(1);
    wrapper.find('.more').simulate('click');
    expect(wrapper.find('.cond-para')).toHaveLength(0);
  });
});
