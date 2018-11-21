import React from 'react';
import { ListGroup } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console

class TreeViewMenu extends React.Component {
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

  walk = ({ data, activeKey = '', parent = '', level = 0, openNodes }) =>
    Object.entries(data)
      .sort((a, b) => a[1].index - b[1].index)
      .reduce((all, [nodeName, node]) => {
        const { label, onClick, nodes, key } = node;
        const hasSubItems = nodes !== undefined && nodes !== null;
        if (!key) return all;
        const isActive = activeKey === key;
        const currentNode = [parent, nodeName].filter(x => x).join('/');
        const isOpen = openNodes.includes(currentNode);
        const onClickFunction = this.getOnClickFunction({
          onClick,
          node: currentNode
        });
        const currentItem = (
          <ListGroupItem
            onClick={onClickFunction}
            active={isActive}
            hasSubItems={hasSubItems}
            level={level}
            key={currentNode}
            isOpen={isOpen}
          >
            {label}
          </ListGroupItem>
        );
        return [
          ...all,
          currentItem,
          nodes &&
            isOpen &&
            this.walk({
              data: nodes,
              activeKey,
              parent: currentNode,
              level: level + 1,
              openNodes
            })
        ].filter(x => x);
      }, []);

  render() {
    const { data, activeKey } = this.props;
    const { openNodes } = this.state;
    return <ListGroup>{this.walk({ data, activeKey, openNodes })}</ListGroup>;
  }
}

export default TreeViewMenu;
