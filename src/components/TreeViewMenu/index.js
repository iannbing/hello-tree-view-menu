import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';

import ListGroupItem from './ListGroupItem';

const defaultNavigate = path => () => {
  document.location.href = `${process.env.REACT_APP_BASE_URL}${path}`;
};

class TreeViewMenu extends Component {
  static defaultProps = {
    data: null,
    path: '',
    navigate: defaultNavigate
  };

  componentDidMount() {
    const { data } = this.props;

    console.log(data);
  }

  render() {
    const { navigate } = this.props;

    return (
      <ListGroup>
        <ListGroupItem
          onClick={() => navigate('/releasenotes')}
          active
          hasSubItems
        >
          Release Notes
        </ListGroupItem>
        <ListGroupItem
          hasSubItems
          level={1}
          isOpen
          onClick={() => navigate('/developerportal')}
        >
          Developer Portal
        </ListGroupItem>
        <ListGroupItem hasSubItems level={2}>
          Developer Portal
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default TreeViewMenu;
