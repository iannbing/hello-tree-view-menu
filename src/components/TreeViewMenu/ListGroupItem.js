import React from 'react';
import styled from 'react-emotion';
import { ListGroupItem as DefaultListGroupItem } from 'reactstrap';

const DEFAULT_PADDING = 1.25;
const LEVEL_SPACE = 1.25;
const ICON_SIZE = 1;

const ToggleIcon = styled('div')(({ level = 0 }) => ({
  position: 'absolute',
  left: `${ICON_SIZE + level * LEVEL_SPACE}rem`,
  width: `${ICON_SIZE}rem`,
  height: `${ICON_SIZE}rem`
}));

const ListGroupItemWithPadding = styled(DefaultListGroupItem)(
  ({ level = 0 }) => ({
    paddingLeft: `${DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE}rem`,
    cursor: 'pointer'
  })
);

const ListGroupItem = ({
  hasSubItems = false,
  isOpen = false,
  level = 0,
  children,
  ...props
}) => (
  <ListGroupItemWithPadding level={level} {...props}>
    {hasSubItems && <ToggleIcon level={level}>{isOpen ? '-' : '+'}</ToggleIcon>}
    {children}
  </ListGroupItemWithPadding>
);

export default ListGroupItem;
