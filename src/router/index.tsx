import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {EditContact, Login, Register, Splash} from '../pages';
import {ROUTER} from './constant';
import Bottom from './bottom';
import {colors} from '../utils';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={ROUTER.Splash}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTER.Login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.Register}
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.Bottom}
        component={Bottom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.EditContact}
        component={EditContact}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
