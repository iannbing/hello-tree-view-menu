import { transpose } from '../dataProcessing';

const data = [
  {
    filename: 'releasenotes.json',
    content: {
      categories: ['Desktop Modeler'],
      pages: [
        {
          t: 'Release Notes',
          i: 'index',
          u: '/releasenotes/',
          d: '/releasenotes/',
          m: true // is root category
        },
        {
          t: 'Desktop Modeler',
          i: 'index',
          u: '/releasenotes/desktop-modeler/',
          d: '/releasenotes/desktop-modeler/'
        },
        {
          t: '7',
          c: 'Desktop Modeler',
          i: '7',
          u: '/releasenotes/desktop-modeler/7',
          d: '/releasenotes/desktop-modeler/'
        },
        {
          t: '7.0',
          i: '7.0',
          u: '/releasenotes/desktop-modeler/7.0',
          d: '/releasenotes/desktop-modeler/',
          p: '7' // parent page
        }
      ]
    }
  }
];

describe('dehydrate', () => {
  it('should get dry data', () => {
    const transposed = transpose({ data, navigate: () => ({}) });
    const expected = {
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
      }
    };
    console.log(transposed);

    expect(transposed).toEqual(expected);
  });
});
