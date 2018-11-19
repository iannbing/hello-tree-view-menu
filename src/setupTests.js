/* eslint-disable import/no-extraneous-dependencies */

import 'babel-polyfill';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));

Enzyme.configure({ adapter: new Adapter() });
