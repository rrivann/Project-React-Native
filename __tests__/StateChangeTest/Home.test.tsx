import React from 'react';
import {create, act} from 'react-test-renderer';
import {Home} from '../../src/screens';

const tree = create(<Home />);

it('snapshot', () => {
  expect(tree).toMatchSnapshot();
});

test('button pr', () => {
  const button = tree.root.findByProps({testID: 'button'}).props;
  act(() => button.onPress());

  const text = tree.root.findByProps({testID: 'text'}).props;
  console.log('button', button);

  expect(text.children).toEqual('button press');
});
