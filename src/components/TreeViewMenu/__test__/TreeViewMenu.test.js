import React from 'react';
import { shallow } from 'enzyme';

import TreeViewMenu from '../index';

const mockData = {
  atd: {
    label: 'ATS Guide',
    onClick: () => ({}),
    key: 'ats',
    index: 1 // ATS Guide should be after Release Notes
  },
  releasenotes: {
    label: 'Release Notes',
    onClick: () => ({}),
    key: 'releasenotes',
    index: 0, // Release Notes should be first
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        onClick: () => ({}),
        key: 'releasenotes/desktop-modeler',
        index: 0,
        nodes: {
          7: {
            label: '7',
            onClick: () => ({}),
            key: 'releasenotes/desktop-modeler/7',
            index: 0,
            nodes: {
              '7.0': {
                label: '7.0',
                onClick: () => ({}),
                key: 'releasenotes/desktop-modeler/7.0',
                index: 0
              }
            }
          }
        }
      }
    }
  }
};

describe('TreeViewMenu', () => {
  it('should render the roots only', () => {
    const wrapper = shallow(
      <TreeViewMenu
        data={mockData}
        activeKey="releasenotes/desktop-modeler/7"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('should only render the matching results that contains "7"', () => {
    const wrapper = shallow(
      <TreeViewMenu
        data={mockData}
        activeKey="releasenotes/desktop-modeler/7"
        searchTerm="7"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
