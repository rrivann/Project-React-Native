import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {
  Articles,
  CreatePost,
  CreateUsers,
  DeletePost,
  DeleteUsers,
  Home,
  ReadPost,
  ReadUsers,
  Splash,
  UpdatePost,
  UpdateUsers,
  Users,
} from '../screens';
import {colors} from '../utils';
import {ROUTER} from './constant';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
      }}>
      <Stack.Screen
        name={ROUTER.Splash}
        component={Splash}
        options={{headerShown: false}}
      />

      <Stack.Screen name={ROUTER.Home} component={Home} />
      <Stack.Screen name={ROUTER.Users} component={Users} />
      <Stack.Screen name={ROUTER.CreateUsers} component={CreateUsers} />
      <Stack.Screen name={ROUTER.ReadUsers} component={ReadUsers} />
      <Stack.Screen name={ROUTER.UpdateUsers} component={UpdateUsers} />
      <Stack.Screen name={ROUTER.DeleteUsers} component={DeleteUsers} />
      <Stack.Screen name={ROUTER.Articles} component={Articles} />
      <Stack.Screen name={ROUTER.CreatePost} component={CreatePost} />
      <Stack.Screen name={ROUTER.ReadPost} component={ReadPost} />
      <Stack.Screen name={ROUTER.UpdatePost} component={UpdatePost} />
      <Stack.Screen name={ROUTER.DeletePost} component={DeletePost} />
    </Stack.Navigator>
  );
};

export default Router;
