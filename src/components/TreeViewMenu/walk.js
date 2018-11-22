import React from 'react';

import ListGroupItem from './ListGroupItem';

const walk = ({
  data,
  parent = '',
  level = 0,
  activeKey,
  openNodes,
  searchTerm,
  getOnClickFunction
}) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce((all, [nodeName, node]) => {
      const { label, onClick, nodes, key } = node;
      const hasSubItems = nodes !== undefined && nodes !== null;
      if (!key) return all;
      const isActive = activeKey === key;
      const currentNode = [parent, nodeName].filter(x => x).join('/');
      const showChildren = openNodes.includes(currentNode) || searchTerm;
      const onClickFunction = getOnClickFunction({
        onClick,
        node: currentNode
      });
      const isMatching =
        searchTerm &&
        label.toLowerCase().includes(searchTerm.trim().toLowerCase());

      const currentItem = (
        <ListGroupItem
          hasSubItems={hasSubItems}
          isOpen={showChildren}
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
        walk({
          data: nodes,
          parent: currentNode,
          level: level + 1,
          activeKey,
          openNodes,
          searchTerm,
          getOnClickFunction,
          showChildren
        });

      return [
        ...all,
        (!searchTerm || isMatching) && currentItem,
        showChildren && nextLevelItems
      ].filter(x => x);
    }, []);

export default walk;
