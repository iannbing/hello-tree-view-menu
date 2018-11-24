import React from 'react';

import ListGroupItem from './ListGroupItem';

const walk = (data, props) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce(
      (all, [nodeName, node]) => [
        ...all,
        ...(node.key ? generateBranch(node, nodeName, props) : [])
      ],
      []
    );

const generateBranch = (node, nodeName, props) => {
  const { parent = '', level = 0, openNodes, searchTerm, activeKey } = props;
  const { nodes, key } = node;
  const currentNode = [parent, nodeName].filter(x => x).join('/');
  const isActive = activeKey === key;
  const showChildren =
    !!nodes && (openNodes.includes(currentNode) || searchTerm || isActive);

  const currentItem = getComponent({
    showChildren,
    currentNode,
    isActive,
    ...props,
    ...node
  });
  const nextLevelItems = showChildren
    ? walk(nodes, { ...props, parent: currentNode, level: level + 1 })
    : [];

  return [currentItem, ...nextLevelItems].filter(x => x);
};

const getComponent = ({
  isActive,
  showChildren,
  nodes,
  level,
  currentNode,
  label,
  searchTerm,
  getOnClickFunction,
  onClick,
  toggleIcon
}) => {
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
        toggleIcon={toggleIcon}
      >
        {label}
      </ListGroupItem>
    )
  );
};

export default walk;
