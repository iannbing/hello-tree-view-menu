import React from 'react';
import { shallow } from 'enzyme';

import ListGroupItem from '../ListGroupItem';

const ToggleIcon = () => null;

describe('TreeViewMenu', () => {
  it('should render without the toggle icon', () => {
    const wrapper = shallow(
      <ListGroupItem hasSubItems={false}>foo</ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children().length).toBe(1);
  });

  it('should render with the toggle icon "-"', () => {
    const wrapper = shallow(
      <ListGroupItem hasSubItems isOpen level={1} toggleIcon={ToggleIcon}>
        foo
      </ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children().length).toBe(2);
  });
  it('should render with the toggle icon "+"', () => {
    const wrapper = shallow(
      <ListGroupItem
        hasSubItems
        isOpen={false}
        level={1}
        toggleIcon={ToggleIcon}
      >
        foo
      </ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children().length).toBe(2);
  });
  it('should render with level 3', () => {
    const wrapper = shallow(
      <ListGroupItem
        hasSubItems
        isOpen={false}
        level={3}
        toggleIcon={ToggleIcon}
      >
        foo
      </ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('level')).toEqual(3);
    expect(wrapper.childAt(0).prop('level')).toEqual(3);
  });
});