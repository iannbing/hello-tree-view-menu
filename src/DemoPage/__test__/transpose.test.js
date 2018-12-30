import transpose from '../transpose';
import data, { releasenotes } from '../../__mock__/data.mock';

describe('transpose', () => {
  // for comparing objects
  const formatValue = value => JSON.parse(JSON.stringify(value));

  const expected = {
    releasenotes: {
      label: 'Release Notes',
      url: 'releasenotes',
      index: 0,
      nodes: {
        'desktop-modeler': {
          label: 'Desktop Modeler',
          url: 'releasenotes/desktop-modeler',
          index: 1,
          nodes: {
            7: {
              label: '7',
              url: 'releasenotes/desktop-modeler/7',
              index: 2,
              nodes: {
                '7.0': {
                  label: '7.0',
                  url: 'releasenotes/desktop-modeler/7.0',
                  index: 3,
                },
              },
            },
          },
        },
      },
    },
  };
  const expectedArray = [
    {
      key: 'releasenotes',
      label: 'Release Notes',
      url: 'releasenotes',
      nodes: [
        {
          key: 'desktop-modeler',
          label: 'Desktop Modeler',
          url: 'releasenotes/desktop-modeler',
          nodes: [
            {
              key: '7',
              label: '7',
              url: 'releasenotes/desktop-modeler/7',
              nodes: [
                {
                  key: '7.0',
                  label: '7.0',
                  url: 'releasenotes/desktop-modeler/7.0',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  it('should transpose an array of space', () => {
    const transposed = transpose({ data });

    const transposedValue = formatValue(transposed);
    const expectedValue = formatValue(expected);

    expect(transposedValue).toEqual(expectedValue);
  });
  it('should transpose an array of space to an Array', () => {
    const transposed = transpose({ data, toArray: true });

    const transposedValue = formatValue(transposed);
    const expectedValue = formatValue(expectedArray);

    expect(transposedValue).toEqual(expectedValue);
  });
  it('should transpose a single space', () => {
    const transposed = transpose({
      data: releasenotes,
      index: 0,
    });

    const transposedValue = formatValue(transposed);
    const expectedValue = formatValue(expected);

    expect(transposedValue).toEqual(expectedValue);
  });
  it('should ignore spaces without key', () => {
    const transposed = transpose({
      data: [
        ...data,
        {
          filename: 'foo.json',
          content: {
            categories: ['Foo'],
            pages: [
              {
                t: 'Release Notes', // title
                i: 'index',
                d: '/releasenotes/', // directory
                m: true, // is root category
              },
            ],
          },
        },
      ],
    });

    const transposedValue = formatValue(transposed);
    const expectedValue = formatValue(expected);

    expect(transposedValue).toEqual(expectedValue);
  });
});
