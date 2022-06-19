import React from 'react';
import {create} from 'react-test-renderer';
import {Home} from '../../src/screens';

it('snapshot', () => {
  expect(create(<Home />)).toMatchSnapshot();
});
