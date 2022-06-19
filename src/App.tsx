import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import Router from './router';
import {HOST} from './services';
import {colors} from './utils';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: HOST,
  cache: new InMemoryCache(),
});

const MainApp = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} />
      <Router />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MainApp />
    </ApolloProvider>
  );
};

export default App;
