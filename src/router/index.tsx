import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailMovie, Home, MyTicket, Splash, TicketConfirm} from '../pages';
import {ROUTER} from './constant';
import {colors, Fonts} from '../utils';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary, opacity: 5},
        headerTintColor: colors.white,
        headerTitleStyle: {fontFamily: Fonts.regular, marginTop: 5},
      }}>
      <Stack.Screen
        name={ROUTER.splash}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTER.home}
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'MovieQue',
        }}
      />
      <Stack.Screen
        name={ROUTER.detailMovie}
        component={DetailMovie}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'CHOOSE TIME',
        }}
      />
      <Stack.Screen
        name={ROUTER.ticketConfirm}
        component={TicketConfirm}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'TICKET CONFIRM',
        }}
      />
      <Stack.Screen
        name={ROUTER.myticket}
        component={MyTicket}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'MY TICKET',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
