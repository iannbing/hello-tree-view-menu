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
  const isOpen = !!nodes && (openNodes.includes(currentNode) || !!searchTerm);

  const currentItem = getComponent({
    isOpen,
    currentNode,
    isActive,
    ...props,
    ...node
  });
  const nextLevelItems = isOpen
    ? walk(nodes, { ...props, parent: currentNode, level: level + 1 })
    : [];

  return [currentItem, ...nextLevelItems].filter(x => x);
};

const getComponent = ({
  isActive,
  isOpen,
  nodes,
  key,
  level,
  currentNode,
  label,
  searchTerm,
  getOnClickItem,
  toggleIcon
}) => {
  const showCurrent =
    !searchTerm ||
    label.toLowerCase().includes(searchTerm.trim().toLowerCase());
  const onClickItem = getOnClickItem({ node: currentNode, label, key });

  //   console.log(isOpen);

  return (
    showCurrent && (
      <ListGroupItem
        hasSubItems={!!nodes}
        isOpen={isOpen}
        level={level}
        onClick={onClickItem}
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
