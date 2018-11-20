import React from 'react';
import { ListGroup } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console
const cleanPath = path => path.replace(/(^\/)(.*)(\/$)/g, (all, g1, g2) => g2);

const walk = ({ data, path = '', parent = '', level = 0 }) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce((all, [key, node]) => {
      const { label, onClick, nodes, url } = node;
      const hasSubItems = nodes && nodes.length > 1;
      const isActive = cleanPath(path) === cleanPath(url);
      const currentNode = [parent, key].filter(x => x).join('/');
      return [
        ...all,
        <ListGroupItem
          onClick={onClick || defaultOnClick}
          active={isActive}
          hasSubItems={hasSubItems}
          level={level}
          key={currentNode} // node is unique
        >
          {label}
        </ListGroupItem>,
        nodes &&
          walk({
            data: nodes,
            path,
            parent: currentNode,
            level: level + 1
          })
      ].filter(x => x);
    }, []);

const TreeViewMenu = ({ data, path }) => (
  <ListGroup>{walk({ data, path })}</ListGroup>
);

export default TreeViewMenu;
