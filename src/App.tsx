import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Router from './router';
import {colors} from './utils';
import FlashMessage from 'react-native-flash-message';

const MainApp = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} />
      <Router />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
