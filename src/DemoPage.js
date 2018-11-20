import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import TreeViewMenu from './components/TreeViewMenu';
import data from './data/spaces.json';

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
    return <TreeViewMenu data={data} path={path} navigate={this.navigate} />;
  }
}

export default withRouter(DemoPage);
