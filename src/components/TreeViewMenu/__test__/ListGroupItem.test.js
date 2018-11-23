import React from 'react';
import { shallow } from 'enzyme';

import ListGroupItem from '../ListGroupItem';

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
      <ListGroupItem hasSubItems isOpen level={1}>
        foo
      </ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children().length).toBe(2);
    expect(
      wrapper
        .childAt(0)
        .children()
        .text()
    ).toBe('-');
  });
  it('should render with the toggle icon "+"', () => {
    const wrapper = shallow(
      <ListGroupItem hasSubItems isOpen={false} level={1}>
        foo
      </ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children().length).toBe(2);
    expect(
      wrapper
        .childAt(0)
        .children()
        .text()
    ).toBe('+');
  });
  it('should render with level 3', () => {
    const wrapper = shallow(
      <ListGroupItem hasSubItems isOpen={false} level={3}>
        foo
      </ListGroupItem>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('level')).toEqual(3);
    expect(wrapper.childAt(0).prop('level')).toEqual(3);
  });
});
