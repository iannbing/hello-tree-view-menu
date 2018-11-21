import React from 'react';
import { ListGroup } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console

class TreeViewMenu extends React.Component {
  static defaultProps = {
    data: null,
    activeKey: '',
    searchTerm: ''
  };

  state = { openNodes: [] };

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
    const { activeKey, searchTerm } = this.props;
    const { openNodes } = this.state;

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
        const isMatching = searchTerm && label.includes(searchTerm);
        const currentItem = (!searchTerm || isMatching) && (
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
          isOpen &&
          this.walk({
            data: nodes,
            parent: currentNode,
            level: level + 1
          });
        return [...all, currentItem, nextLevelItems].filter(x => x);
      }, []);
  };

  render() {
    const { data, activeKey } = this.props;
    const { openNodes } = this.state;
    return (
      data && <ListGroup>{this.walk({ data, activeKey, openNodes })}</ListGroup>
    );
  }
}

export default TreeViewMenu;
