import React from 'react';
import { ListGroup } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console

const walk = ({ data, activeKey = '', parent = '', level = 0 }) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce((all, [nodeName, node]) => {
      const { label, onClick, nodes, key } = node;
      const hasSubItems = nodes !== undefined && nodes !== null;
      if (!key) return all;
      const isActive = activeKey === key;
      const currentNode = [parent, nodeName].filter(x => x).join('/');
      const currentItem = (
        <ListGroupItem
          onClick={onClick || defaultOnClick}
          active={isActive}
          hasSubItems={hasSubItems}
          level={level}
          key={currentNode}
        >
          {label}
        </ListGroupItem>
      );
      return [
        ...all,
        currentItem,
        nodes &&
          walk({
            data: nodes,
            activeKey,
            parent: currentNode,
            level: level + 1
          })
      ].filter(x => x);
    }, []);

const TreeViewMenu = ({ data, activeKey }) => (
  <ListGroup>{walk({ data, activeKey })}</ListGroup>
);

export default TreeViewMenu;
