import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
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

  state = { path: '', treeData: null, searchTerm: '' };

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

  onChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { path, treeData, searchTerm } = this.state;
    const activeKey = cleanPath(path);
    return (
      <>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
          <Input value={searchTerm} onChange={this.onChange} />
        </InputGroup>
        {treeData && (
          <TreeViewMenu
            data={treeData}
            activeKey={activeKey}
            searchTerm={searchTerm}
          />
        )}
      </>
    );
  }
}

export default withRouter(DemoPage);
