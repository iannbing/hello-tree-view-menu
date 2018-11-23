import React from 'react';

import ListGroupItem from './ListGroupItem';

const getItem = ({
  activeKey,
  key,
  showChildren,
  nodes,
  level,
  currentNode,
  label,
  searchTerm,
  getOnClickFunction,
  onClick
}) => {
  const isActive = activeKey === key;
  const showCurrent =
    !searchTerm ||
    label.toLowerCase().includes(searchTerm.trim().toLowerCase());
  const onClickFunction = getOnClickFunction({ onClick, node: currentNode });

  return (
    showCurrent && (
      <ListGroupItem
        hasSubItems={!!nodes}
        isOpen={showChildren}
        level={level}
        onClick={onClickFunction}
        active={isActive}
        key={currentNode}
      >
        {label}
      </ListGroupItem>
    )
  );
};

const getNodeComponent = (node, nodeName, props) => {
  const { parent = '', level = 0, openNodes, searchTerm } = props;
  const { nodes } = node;
  const currentNode = [parent, nodeName].filter(x => x).join('/');
  const showChildren =
    !!nodes && (openNodes.includes(currentNode) || searchTerm);

  const currentItem = getItem({
    showChildren,
    currentNode,
    ...props,
    ...node
  });
  const nextLevelItems = showChildren
    ? walk(nodes, { ...props, parent: currentNode, level: level + 1 })
    : [];

  return [currentItem, ...nextLevelItems].filter(x => x);
};

const walk = (data, props) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce(
      (all, [nodeName, node]) => [
        ...all,
        ...(node.key ? getNodeComponent(node, nodeName, props) : [])
      ],
      []
    );

export default walk;
