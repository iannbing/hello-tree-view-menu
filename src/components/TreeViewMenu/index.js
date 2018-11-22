import React, { Suspense } from 'react';
import { debounce, isEqual } from 'lodash';
import { ListGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import walk from './walk';

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

  componentDidMount() {
    this.loadListItems();
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    const { openNodes } = this.state;
    if (isEqual(prevProps.data !== data) || prevState.openNodes !== openNodes) {
      this.loadListItems();
    }
  }

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

  loadListItems = () => {
    const { data, activeKey } = this.props;
    const { openNodes, searchTerm } = this.state;

    this.setState({
      items: walk({
        data,
        activeKey,
        openNodes,
        searchTerm,
        getOnClickFunction: this.getOnClickFunction
      })
    });
  };

  render() {
    const { data, search } = this.props;
    const { items } = this.state;

    return (
      <>
        {search && (
          <InputGroup>
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input onChange={this.onChange} />
          </InputGroup>
        )}
        {data && (
          <Suspense fallback={<div>loading...</div>}>
            <ListGroup>{items}</ListGroup>
          </Suspense>
        )}
      </>
    );
  }
}

export default TreeViewMenu;
