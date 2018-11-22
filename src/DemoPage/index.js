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

  state = { path: '', treeData: null };

  componentDidMount() {
    this.processData();
  }

  processData = () => {
    const treeData = transpose({ data, navigate: this.navigate });
    this.setState({ treeData });
  };

  navigate = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { path, treeData } = this.state;
    const activeKey = cleanPath(path);
    return (
      <>
        {treeData && (
          <TreeViewMenu data={treeData} activeKey={activeKey} search />
        )}
      </>
    );
  }
}

export default withRouter(DemoPage);