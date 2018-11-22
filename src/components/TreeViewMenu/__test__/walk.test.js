import React from 'react';
import { shallow } from 'enzyme';

import walk from '../walk';

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

describe('walk', () => {
  it('should only render the matching results that contains "7"', () => {
    const wrapper = shallow(
      <div>
        {walk({
          data: mockData,
          activeKey: '',
          openNodes: [],
          getOnClickFunction: () => ({}),
          searchTerm: '7'
        })}
      </div>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
