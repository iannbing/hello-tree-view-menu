import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import TreeViewMenu from 'react-simple-tree-menu';

import data from '../data/spaces.json';
import transpose from './transpose';
import { getRenderItem, renderList } from './renderProps';

const cleanPath = path =>
  path
    .split('/')
    .filter(x => x)
    .join('/');

class DemoPage extends Component {
  static getDerivedStateFromProps(props) {
    const path = get(props, 'location.pathname');

    return { path: cleanPath(path) };
  }

  state = { path: '', treeData: null };

  componentDidMount() {
    this.processData();
  }

  processData = () => {
    const treeData = transpose({ data });
    this.setState({ treeData });
  };

  navigate = key => {
    const { history } = this.props;
    history.push(`/${key}`);
  };

  render() {
    const { treeData, path } = this.state;

    return (
      <>
        {treeData && (
          <TreeViewMenu
            data={treeData}
            onClickItem={({ url, label, key }) => {
              this.navigate(url);
              console.log({ label, key, url }); // eslint-disable-line no-console
            }}
            debounceTime={125}
            renderItem={getRenderItem(path)}
            renderList={renderList}
          />
        )}
      </>
    );
  }
}

export default withRouter(DemoPage);
