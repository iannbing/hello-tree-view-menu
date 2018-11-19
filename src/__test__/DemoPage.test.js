import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';

import DemoPage from '../DemoPage';

const mockData = [{ foo: 'bar' }];
const mockPath = '/foo';

jest.mock('../components/TreeViewMenu', () => 'mock-tree-view-menu');
jest.mock('../data/spaces.json', () => [{ foo: 'bar' }]);

describe('DemoPage', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ pathname: mockPath, key: 'path' }]}>
        <Route path={mockPath} render={props => <DemoPage {...props} />} />
      </MemoryRouter>
    );

    expect(wrapper.find(DemoPage)).toMatchSnapshot();
  });

  it('should provide correct props for TreeViewMenu', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ pathname: mockPath, key: 'path' }]}>
        <Route path={mockPath} render={props => <DemoPage {...props} />} />
      </MemoryRouter>
    );

    expect(wrapper.find('mock-tree-view-menu').prop('data')).toEqual(mockData);
    expect(wrapper.find('mock-tree-view-menu').prop('path')).toEqual(mockPath);
  });
});
