import transpose from '../transpose';
import data from '../../__mock__/data.mock';

describe('transpose', () => {
  it('should get transposed data', () => {
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
            index: 1,
            nodes: {
              7: {
                label: '7',
                onClick: () => ({}),
                url: '/releasenotes/desktop-modeler/7',
                index: 2,
                nodes: {
                  '7.0': {
                    label: '7.0',
                    onClick: () => ({}),
                    url: '/releasenotes/desktop-modeler/7.0',
                    index: 3
                  }
                }
              }
            }
          }
        }
      }
    };

    // for comparing objects
    const formatValue = value => JSON.parse(JSON.stringify(value));

    const transposedValue = formatValue(transposed);
    const expectedValue = formatValue(expected);

    expect(transposedValue).toEqual(expectedValue);
  });
});
