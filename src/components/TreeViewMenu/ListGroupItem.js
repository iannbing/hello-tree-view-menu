import React from 'react';
import styled from 'react-emotion';
import { ListGroupItem as DefaultListGroupItem } from 'reactstrap';

const DEFAULT_PADDING = 1.25;
const LEVEL_SPACE = 1;

const ToggleIcon = styled('div')({
  position: 'absolute',
  left: 20,
  width: 10,
  height: 10
});

const ListGroupItemWithPadding = styled(DefaultListGroupItem)(
  ({ level = 0 }) => ({
    paddingLeft: `${DEFAULT_PADDING + level * LEVEL_SPACE}rem`
  })
);

const ListGroupItem = ({
  hasSubItems = false,
  isOpen = false,
  level = 0,
  children,
  ...props
}) => (
  <>
    <ListGroupItemWithPadding level={hasSubItems ? level : 0} {...props}>
      {hasSubItems && <ToggleIcon>{isOpen ? '-' : '+'}</ToggleIcon>}
      {children}
    </ListGroupItemWithPadding>
  </>
);

export default ListGroupItem;
