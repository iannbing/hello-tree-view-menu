import React from 'react';
import { debounce } from 'lodash';
import { ListGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import walk from './walk';

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
    this.toggleNode(props.node);
  };

  loadListItems = () => {
    const { data, activeKey, toggleIcon } = this.props;
    const { openNodes, searchTerm } = this.state;

    return walk(data, {
      activeKey,
      openNodes,
      searchTerm,
      toggleIcon,
      getOnClickItem: this.getOnClickItem
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
