import React from 'react';
import {create} from 'react-test-renderer';
import {Home} from '../../src/screens';
import {ROUTE} from '../../src/router/constant';

const navigation = {
  navigate: jest.fn(),
};

const tree = create(<Home navigation={navigation} />);

test('navigate ', () => {
  const button = tree.root.findByProps({testID: 'button'}).props;
  button.onPress();

  expect(navigation.navigate).toBeCalledWith(ROUTE.Quran);
});
