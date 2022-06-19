import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AbsenIn, AbsenOut, DataAbsen, Login, Register, Splash} from '../pages';
import {colors} from '../utils';
import Bottom from './bottom';
import {ROUTER} from './constant';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
      }}>
      <Stack.Screen
        name={ROUTER.splash}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.bottom}
        component={Bottom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.register}
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTER.dataAbsen} component={DataAbsen} />
      <Stack.Screen name={ROUTER.absenIn} component={AbsenIn} />
      <Stack.Screen name={ROUTER.absenOut} component={AbsenOut} />
    </Stack.Navigator>
  );
};

export default Router;
