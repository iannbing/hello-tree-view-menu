import React from 'react';
import styled from 'react-emotion';
import {
  ListGroupItem as DefaultListGroupItem,
  ListGroup,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

const DEFAULT_PADDING = 1.25;
const LEVEL_SPACE = 1.25;
const ICON_SIZE = 1;
const ToggleIcon = ({ on }) => <div>{on ? '-' : '+'}</div>;

const ToggleIconContainer = styled('div')(({ level = 0 }) => ({
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

export const renderItem = ({ hasSubItems, isOpen, level, label, ...props }) => (
  <ListGroupItemWithPadding level={level} {...props}>
    {hasSubItems && (
      <ToggleIconContainer level={level}>
        <ToggleIcon on={isOpen} />
      </ToggleIconContainer>
    )}
    {label}
  </ListGroupItemWithPadding>
);

export const renderGroup = items => <ListGroup>{items}</ListGroup>;

export const renderSearch = onSearch => (
  <InputGroup>
    <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
    <Input onChange={onSearch} />
  </InputGroup>
);
