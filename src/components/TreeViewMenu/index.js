import React from 'react';
import { debounce } from 'lodash';
import { ListGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import walk from './walk';
import ListGroupItem from './ListGroupItem';

const defaultOnClick = () => console.warn('no behavior defined'); // eslint-disable-line no-console

const getDebouncedSearch = timeout =>
  debounce((searchFunction, value) => searchFunction(value), timeout);

class TreeViewMenu extends React.Component {
  static defaultProps = {
    data: null,
    activeKey: '',
    search: false,
    onClickItem: defaultOnClick,
    debounceTime: 125
  };

  state = { openNodes: [], searchTerm: '' };

  componentDidMount() {
    const { debounceTime } = this.props;
    this.search = getDebouncedSearch(debounceTime);
  }

  onChange = e => {
    const { value } = e.target;
    this.search(searchTerm => this.setState({ searchTerm }), value);
  };

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

  getOnClickItem = props => () => {
    const { onClickItem } = this.props;
    onClickItem(props);
    this.toggleNode(props.nodePath);
  };

  loadListItems = () => {
    const { data, activeKey, toggleIcon } = this.props;
    const { openNodes, searchTerm } = this.state;

    const items = walk(data, { openNodes, searchTerm });

    return items.map(({ isOpen, nodes, key, level, nodePath, label }) => {
      const onClick = this.getOnClickItem({ nodePath, label, key });
      return (
        <ListGroupItem
          hasSubItems={!!nodes}
          isOpen={isOpen}
          level={level}
          onClick={onClick}
          active={key === activeKey}
          key={nodePath}
          toggleIcon={toggleIcon}
        >
          {label}
        </ListGroupItem>
      );
    });
  };

  render() {
    const { data, search } = this.props;

    return (
      <>
        {search && (
          <InputGroup>
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input onChange={this.onChange} />
          </InputGroup>
        )}
        {data && <ListGroup>{this.loadListItems()}</ListGroup>}
      </>
    );
  }
}

export default TreeViewMenu;
