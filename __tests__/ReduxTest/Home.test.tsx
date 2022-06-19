import React from 'react';
import {act, create} from 'react-test-renderer';
import {Home} from '../../src/screens';
import {store} from '../../src/redux';

const tree = create(<Home />);

it('snapshot', () => {
  expect(tree).toMatchSnapshot();
});

test('call timeout', () => {
  act((): any => jest.runAllTimers());

  const text = tree.root.findByProps({testID: 'text'}).props;
  expect(text.children).toEqual('called');
});

test('store', () => {
  expect(store.getState().surat.nomor).toEqual('');
});
