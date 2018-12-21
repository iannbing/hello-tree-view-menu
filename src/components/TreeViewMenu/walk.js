const walk = ({ data, ...props }) =>
  Object.entries(data)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce(
      (all, [nodeName, node]) => [
        ...all,
        ...(node.key ? generateBranch(node, nodeName, props) : []),
      ],
      [],
    );

const generateBranch = (node, nodeName, props) => {
  const { parent = '', level = 0, openNodes, searchTerm } = props;
  const { nodes, label } = node;
  const nodePath = [parent, nodeName].filter(x => x).join('/');
  const isOpen = !!nodes && (openNodes.includes(nodePath) || !!searchTerm);
  const isVisible =
    !searchTerm ||
    label.toLowerCase().includes(searchTerm.trim().toLowerCase());

  const currentItem = isVisible && {
    isOpen,
    nodePath,
    ...props,
    ...node,
  };
  const nextLevelItems = isOpen
    ? walk({ data: nodes, ...props, parent: nodePath, level: level + 1 })
    : [];

  return [currentItem, ...nextLevelItems].filter(x => x);
};

export default walk;
