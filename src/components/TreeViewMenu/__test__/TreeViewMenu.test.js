import React from 'react';
import { shallow } from 'enzyme';

import TreeViewMenu from '../index';
// import data from '../../../data/spaces.json';

const mockData = {
  releasenotes: {
    label: 'Release Notes',
    onClick: () => ({}),
    index: 0,
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        onClick: () => ({}),
        index: 0,
        nodes: {
          7: {
            label: '7',
            onClick: () => ({}),
            index: 0,
            nodes: {
              '7.0': {
                label: '7.0',
                onClick: () => ({}),
                index: 0
              }
            }
          }
        }
      }
    }
  },
  atd: {
    label: 'ATS Guide',
    onClick: () => ({}),
    index: 1
  }
};

describe('TreeViewMenu', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TreeViewMenu
        data={mockData}
        activeNode="releasenotes/desktop-modeler/7"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
