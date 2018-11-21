import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import TreeViewMenu from '../components/TreeViewMenu';
import data from '../data/spaces.json';
import transpose from './transpose';

class DemoPage extends Component {
  static getDerivedStateFromProps(props) {
    const path = get(props, 'match.url');
    return { path };
  }

  state = { path: '' };

  navigate = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { path } = this.state;
    const processedData = transpose({ data, navigate: this.navigate });
    return <TreeViewMenu data={processedData} path={path} />;
  }
}

export default withRouter(DemoPage);
