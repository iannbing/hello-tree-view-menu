import styled from 'react-emotion';
import { ListGroupItem as DefaultListGroupItem } from 'reactstrap';

const DEFAULT_PADDING = 1.25;
const LEVEL_SPACE = 1;

const ListGroupItem = styled(DefaultListGroupItem)(({ level = 0 }) => ({
  paddingLeft: `${DEFAULT_PADDING + level * LEVEL_SPACE}rem`
}));

export default ListGroupItem;
