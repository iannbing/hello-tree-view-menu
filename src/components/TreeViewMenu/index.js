import React from 'react';
import { debounce } from 'lodash';
import { ListGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

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

  walk = ({ data, parent = '', level = 0 }) => {
    const { activeKey } = this.props;
    const { openNodes, searchTerm } = this.state;

    return Object.entries(data)
      .sort((a, b) => a[1].index - b[1].index)
      .reduce((all, [nodeName, node]) => {
        const { label, onClick, nodes, key } = node;
        const hasSubItems = nodes !== undefined && nodes !== null;
        if (!key) return all;
        const isActive = activeKey === key;
        const currentNode = [parent, nodeName].filter(x => x).join('/');
        const isOpen = openNodes.includes(currentNode) || searchTerm;
        const onClickFunction = this.getOnClickFunction({
          onClick,
          node: currentNode
        });
        const isMatching =
          searchTerm &&
          label.toLowerCase().includes(searchTerm.trim().toLowerCase());
        const currentItem = (
          <ListGroupItem
            hasSubItems={hasSubItems}
            isOpen={isOpen}
            level={level}
            onClick={onClickFunction}
            active={isActive}
            key={currentNode}
          >
            {label}
          </ListGroupItem>
        );
        const nextLevelItems =
          nodes &&
          this.walk({
            data: nodes,
            parent: currentNode,
            level: level + 1
          });
        return [
          ...all,
          (!searchTerm || isMatching) && currentItem,
          isOpen && nextLevelItems
        ].filter(x => x);
      }, []);
  };

  render() {
    const { data, activeKey, search } = this.props;
    const { openNodes } = this.state;
    return (
      <>
        {search && (
          <InputGroup>
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input onChange={this.onChange} />
          </InputGroup>
        )}
        {data && (
          <ListGroup>{this.walk({ data, activeKey, openNodes })}</ListGroup>
        )}
      </>
    );
  }
}

export default TreeViewMenu;
