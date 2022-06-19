jest.useFakeTimers();
import 'react-native-gesture-handler/jestSetup';
import {jest} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-gesture-handler');

jest.mock('../src/assets');
