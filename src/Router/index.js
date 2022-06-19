import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Anim1,
  Anim10,
  Anim11,
  Anim12,
  Anim13,
  Anim14,
  Anim15,
  Anim16,
  Anim2,
  Anim3,
  Anim4,
  Anim5,
  Anim6,
  Anim7,
  Anim8,
  Anim9,
  Home,
} from '../Page';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim1"
        component={Anim1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim2"
        component={Anim2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim3"
        component={Anim3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim4"
        component={Anim4}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim5"
        component={Anim5}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim6"
        component={Anim6}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim7"
        component={Anim7}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim8"
        component={Anim8}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim9"
        component={Anim9}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim10"
        component={Anim10}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim11"
        component={Anim11}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim12"
        component={Anim12}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim13"
        component={Anim13}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim14"
        component={Anim14}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim15"
        component={Anim15}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anim16"
        component={Anim16}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
