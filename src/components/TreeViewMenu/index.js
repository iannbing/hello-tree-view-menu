import React from 'react';
import { debounce } from 'lodash';

import walk from './walk';
import {
  renderItem as defaultRenderItem,
  renderList as defaultRenderList,
} from './renderProps';

const defaultOnClick = props => console.log(props); // eslint-disable-line no-console

const getDebouncedSearch = timeout =>
  debounce((searchFunction, value) => searchFunction(value), timeout);

class TreeViewMenu extends React.Component {
  static defaultProps = {
    data: null,
    activeKey: '',
    search: false,
    onClickItem: defaultOnClick,
    debounceTime: 125,
    renderItem: defaultRenderItem,
    renderList: defaultRenderList,
  };

  state = { openNodes: [], searchTerm: '' };

  componentDidMount() {
    const { debounceTime } = this.props;
    this.search = getDebouncedSearch(debounceTime);
  }

  onSearch = e => {
    const { value } = e.target;
    this.search(searchTerm => this.setState({ searchTerm }), value);
  };

  toggleNode = node => {
    const { openNodes } = this.state;
    if (openNodes.includes(node)) {
      this.setState({
        openNodes: openNodes.filter(openNode => openNode !== node),
      });
    } else {
      this.setState({ openNodes: [...openNodes, node] });
    }
  };

  getOnClickItem = props => () => {
    const { onClickItem } = this.props;
    onClickItem(props);
    this.toggleNode(props.nodePath);
  };

  loadListItems = () => {
    const { data, activeKey, renderItem } = this.props;
    const { openNodes, searchTerm } = this.state;

    const items = walk(data, { openNodes, searchTerm });

    return items.map(({ isOpen, nodes, key, level, nodePath, label }) => {
      const onClick = this.getOnClickItem({ nodePath, label, key });
      return renderItem({
        hasSubItems: !!nodes,
        isOpen,
        level,
        onClick,
        active: key === activeKey,
        key: nodePath,
        label,
      });
    });
  };

  render() {
    const { data, search, renderList } = this.props;
    return (
      <>
        {renderList({
          onSearch: search ? this.onSearch : null,
          items: data ? this.loadListItems() : [],
        })}
      </>
    );
  }
}

export default TreeViewMenu;
