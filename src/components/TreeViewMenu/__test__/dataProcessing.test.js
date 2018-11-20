import { dehydrate } from '../dataProcessing';

const example = [
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
          t: '7.10',
          i: '7.10',
          u: '/releasenotes/desktop-modeler/7.10',
          d: '/releasenotes/desktop-modeler/',
          p: '7' // parent page
        }
      ]
    }
  }
];

describe('dehydrate', () => {
  it('should get dry data', () => {
    const dehydrated = dehydrate(example);
    const expected = [
      {
        releasenotes: {
          title: 'Release Notes',
          url: '/releasenotes/',
          'desktop-modeler': {
            title: 'Desktop Modeler',
            url: '/releasenotes/desktop-modeler/',
            7: {
              title: '7',
              url: '/releasenotes/desktop-modeler/7',
              '7.0': {
                title: '7.0',
                url: '/releasenotes/desktop-modeler/7.0'
              }
            }
          }
        }
      }
    ];

    expect(dehydrated).toEqual(expected);
  });
});
