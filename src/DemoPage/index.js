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

const Icon = ({ on }) => (
  <div style={{ fontWeight: 'bold', position: 'absolute', left: -8 }}>
    {on ? '[-]' : '[+]'}
  </div>
);

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
    const treeData = transpose({ data });
    this.setState({ treeData });
  };

  navigate = key => {
    const { history } = this.props;
    history.push(`/${key}`);
  };

  render() {
    const { path, treeData } = this.state;
    const activeKey = cleanPath(path);
    return (
      <>
        {treeData && (
          <TreeViewMenu
            data={treeData}
            activeKey={activeKey}
            search
            toggleIcon={Icon} // remove this prop to see the default icon
            onClickItem={({ node, label, key }) => {
              this.navigate(key);
              console.log({ node, label, key }); // eslint-disable-line no-console
            }}
            debounceTime={125}
          />
        )}
      </>
    );
  }
}

export default withRouter(DemoPage);
