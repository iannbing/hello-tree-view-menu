import React from 'react';
import { debounce } from 'lodash';
import { ListGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import walk from './walk';
import status from './status';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console

const realtimeSearch = debounce(
  (searchFunction, value) => searchFunction(value),
  500
);

class TreeViewMenu extends React.Component {
  static defaultProps = {
    data: null,
    activeKey: '',
    search: false
  };

  state = { openNodes: [], searchTerm: '' };

  onChange = e => {
    const { value } = e.target;
    realtimeSearch(searchTerm => this.setState({ searchTerm }), value);
  };

  toggleNode = node => {
    const { openNodes } = this.state;
    if (openNodes.includes(node)) {
      this.setState({
        openNodes: openNodes.filter(openNode => openNode !== node)
      });
    } else {
      this.setState({ openNodes: [...openNodes, node] });
    }
  };

  getOnClickFunction = ({ onClick, node }) => () => {
    const onClickFn = onClick || defaultOnClick;
    onClickFn();
    this.toggleNode(node);
  };

  preload = () => {
    const { data, activeKey } = this.props;
    const { openNodes, searchTerm } = this.state;
    status.set('isInitializing', true);
    // load the whole tree to memory to prevent first-time-loading freezzing
    walk({
      data,
      activeKey,
      openNodes,
      searchTerm,
      getOnClickFunction: this.getOnClickFunction
    });
    status.set('isInitializing', false);
  };

  getListItems = () => {
    const { data, activeKey } = this.props;
    const { openNodes, searchTerm } = this.state;
    this.preload();
    return walk({
      data,
      activeKey,
      openNodes,
      searchTerm,
      getOnClickFunction: this.getOnClickFunction
    });
  };

  render() {
    const { data, search } = this.props;
    return (
      <>
        {search && (
          <InputGroup>
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input onChange={this.onChange} />
          </InputGroup>
        )}
        {data && <ListGroup>{this.getListItems()}</ListGroup>}
      </>
    );
  }
}

export default TreeViewMenu;
