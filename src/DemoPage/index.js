import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import TreeViewMenu from '../components/TreeViewMenu';
import data from '../data/spaces.json';
import transpose from './transpose';

const cleanPath = path =>
  path
    .split('/')
    .filter(x => x)
    .join('/');

class DemoPage extends Component {
  static getDerivedStateFromProps(props) {
    const path = get(props, 'location.pathname');

    return { path };
  }

  state = { path: '' };

  navigate = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { path } = this.state;
    const activeKey = cleanPath(path);
    const processedData = transpose({ data, navigate: this.navigate });
    return <TreeViewMenu data={processedData} activeKey={activeKey} />;
  }
}

export default withRouter(DemoPage);
