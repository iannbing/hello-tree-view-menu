import React from 'react';
import styled from 'react-emotion';

const DEFAULT_PADDING = 1.25;
const LEVEL_SPACE = 1.25;
const ICON_SIZE = 1;
const DefaultToggleIcon = ({ on }) => <div>{on ? '-' : '+'}</div>;

const ToggleIconContainer = styled('div')(({ level = 0 }) => ({
  position: 'absolute',
  left: `${ICON_SIZE + level * LEVEL_SPACE}rem`,
  width: `${ICON_SIZE}rem`,
  height: `${ICON_SIZE}rem`
}));

const ListItemContainer = styled('li')(({ level = 0 }) => ({
  paddingLeft: `${DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE}rem`,
  cursor: 'pointer'
}));

export const ListGroup = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 0
});

const Input = styled('input')({
  margin: '.5em',
  paddingLeft: '.4em'
});

export const renderSearch = onSearch => (
  <Input placeholder="Type and search" onChange={onSearch} />
);

const renderItem = ({
  hasSubItems = false,
  isOpen = false,
  level = 0,
  onClick,
  active,
  key,
  toggleIcon = DefaultToggleIcon,
  label,
  ...props
}) => {
  const ToggleIcon = toggleIcon;

  return (
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
};

export default renderItem;
