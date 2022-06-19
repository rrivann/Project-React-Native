import Axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import {act, create} from 'react-test-renderer';
import {Home} from '../../src/screens';
import {store} from '../../src/redux';

const tree = create(
  <Provider store={store}>
    <Home />
  </Provider>,
);

test('request', () => {
  Axios.request.mockImplementation(() =>
    Promise.resolve({data: {status: 'req is called'}}),
  );

  act((): any => jest.runAllTimers());

  const text = tree.root.findByProps({testID: 'text'}).props;
  expect(text.children).toEqual('req is called');
});
