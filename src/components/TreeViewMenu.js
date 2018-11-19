import React, { Component } from 'react';
import { Button } from 'reactstrap';

class TreeViewMenu extends Component {
  static defaultProps = { data: null, path: '' };

  componentDidMount() {
    const { data } = this.props;

    console.log(data);
  }

  render() {
    const { path } = this.props;

    return (
      <div>
        <div>{path}</div>
        <Button color="primary">Click</Button>
      </div>
    );
  }
}

export default TreeViewMenu;
