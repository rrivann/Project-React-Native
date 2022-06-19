import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {BottomNav} from '../components';
import {AddContact, Favorite, Home, Profile} from '../pages';
import {ROUTER} from './constant';

const BottomNavHide = ({...props}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let keyboardEventListeners;
    keyboardEventListeners = [
      Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
      Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
    ];

    return () => {
      keyboardEventListeners &&
        keyboardEventListeners.forEach(eventListener => eventListener.remove());
    };
  }, []);

  const render = () => {
    if (!visible) {
      return null;
    }
    return <BottomNav {...props} />;
  };

  return render();
};

const Tab = createBottomTabNavigator();

const Bottom: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTER.Home}
      tabBar={(props: any) => <BottomNavHide {...props} />}>
      <Tab.Screen name={ROUTER.Home} component={Home} />
      <Tab.Screen name={ROUTER.Favorite} component={Favorite} />
      <Tab.Screen name={ROUTER.AddContact} component={AddContact} />
      <Tab.Screen name={ROUTER.Profile} component={Profile} />
    </Tab.Navigator>
  );
};

export default Bottom;
