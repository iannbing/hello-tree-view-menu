import React from 'react';
import { shallow } from 'enzyme';

import TreeViewMenu from '../index';
import data from '../../../data/spaces.json';

describe('TreeViewMenu', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<TreeViewMenu data={data} path="" />);

    expect(wrapper).toMatchSnapshot();
  });
});
