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
        <ListGroupItem onClick={navigate('/releasenotes')} active>
          Release Notes
        </ListGroupItem>
        <ListGroupItem level={1}>Developer Portal</ListGroupItem>
      </ListGroup>
    );
  }
}

export default TreeViewMenu;
