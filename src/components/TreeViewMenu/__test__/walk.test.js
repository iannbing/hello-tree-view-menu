import walk from '../walk';

const mockData = {
  atd: {
    label: 'ATS Guide',
    key: 'ats',
    index: 1, // ATS Guide should be after Release Notes
  },
  releasenotes: {
    label: 'Release Notes',
    key: 'releasenotes',
    index: 0, // Release Notes should be first
    nodes: {
      'desktop-modeler': {
        label: 'Desktop Modeler',
        key: 'releasenotes/desktop-modeler',
        index: 0,
        nodes: {
          7: {
            label: '7',
            key: 'releasenotes/desktop-modeler/7',
            index: 0,
            nodes: {
              '7.0': {
                label: '7.0',
                key: 'releasenotes/desktop-modeler/7.0',
                index: 0,
              },
            },
          },
        },
      },
    },
  },
};

describe('walk', () => {
  it('should transpose data to a desired shape', () => {
    const result = walk({ data: mockData, openNodes: [], searchTerm: '7' });

    const expected = [
      {
        nodePath: 'releasenotes/desktop-modeler/7',
        index: 0,
        isOpen: true,
        key: 'releasenotes/desktop-modeler/7',
        label: '7',
        level: 2,
        nodes: {
          '7.0': {
            index: 0,
            key: 'releasenotes/desktop-modeler/7.0',
            label: '7.0',
          },
        },
        openNodes: [],
        parent: 'releasenotes/desktop-modeler',
        searchTerm: '7',
      },
      {
        nodePath: 'releasenotes/desktop-modeler/7/7.0',
        index: 0,
        isOpen: false,
        key: 'releasenotes/desktop-modeler/7.0',
        label: '7.0',
        level: 3,
        openNodes: [],
        parent: 'releasenotes/desktop-modeler/7',
        searchTerm: '7',
      },
    ];

    expect(result).toEqual(expected);
  });
});
