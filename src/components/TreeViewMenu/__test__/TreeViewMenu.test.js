import React from 'react';
import { shallow } from 'enzyme';

import TreeViewMenu from '../index';
// import data from '../../../data/spaces.json';

const mockData = {
  releasenotes: {
    label: 'Release Notes',
    onClick: () => ({}),
    url: '/releasenotes/',
    index: 0,
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        onClick: () => ({}),
        url: '/releasenotes/desktop-modeler/',
        index: 0,
        nodes: {
          7: {
            label: '7',
            onClick: () => ({}),
            url: '/releasenotes/desktop-modeler/7',
            index: 0,
            nodes: {
              '7.0': {
                label: '7.0',
                onClick: () => ({}),
                url: '/releasenotes/desktop-modeler/7.0',
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
    url: '/ats/',
    index: 1 // i.e. ATS Guide should be right after Release Notes
  }
};

describe('TreeViewMenu', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TreeViewMenu data={mockData} path="/releasenotes/desktop-modeler/7" />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
