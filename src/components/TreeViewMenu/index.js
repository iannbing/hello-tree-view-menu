import React from 'react';
import { ListGroup } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console

const walk = ({ data, activeNode, parent = '', level = 0 }) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index) // ensure the order is consistent
    .reduce((all, [key, node]) => {
      const { label, onClick, nodes } = node;
      const hasSubItems = nodes && nodes.length > 1;
      const currentNode = [parent, key].filter(x => x).join('/');
      return [
        ...all,
        <ListGroupItem
          onClick={onClick || defaultOnClick}
          active={activeNode === currentNode}
          hasSubItems={hasSubItems}
          level={level}
          key={currentNode}
        >
          {label}
        </ListGroupItem>,
        nodes &&
          walk({
            data: nodes,
            activeNode,
            parent: currentNode,
            level: level + 1
          })
      ].filter(x => x);
    }, []);

const TreeViewMenu = ({ data, activeNode }) => (
  <ListGroup>{walk({ data, activeNode })}</ListGroup>
);

export default TreeViewMenu;
