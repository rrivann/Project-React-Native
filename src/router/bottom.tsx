import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {BottomNav} from '../components';
import {Home, Profile} from '../pages';

const Tab = createBottomTabNavigator();

const Bottom: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props: any) => <BottomNav {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Bottom;
