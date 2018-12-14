import React from 'react';
import styled from 'react-emotion';

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

const ListItemContainer = styled('li')(({ level = 0, active }) => ({
  paddingLeft: `${DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE}rem`,
  cursor: 'pointer',
  color: active ? 'white' : '#333',
  background: active ? '#179ed3' : 'none'
}));

const ListGroup = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 0
});

export const renderGroup = items => <ListGroup>{items}</ListGroup>;

const Input = styled('input')({
  margin: '.5em',
  paddingLeft: '.4em'
});

export const renderSearch = onSearch => (
  <Input placeholder="Type and search" onChange={onSearch} />
);

export const renderItem = ({
  hasSubItems = false,
  isOpen = false,
  level = 0,
  onClick,
  active,
  key,
  label,
  ...props
}) => (
  <ListItemContainer
    level={level}
    onClick={onClick}
    active={active}
    key={key}
    {...props}
  >
    {hasSubItems && (
      <ToggleIconContainer level={level}>
        <ToggleIcon on={isOpen} />
      </ToggleIconContainer>
    )}
    {label}
  </ListItemContainer>
);
