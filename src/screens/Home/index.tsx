/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../../components';
import {ROUTER} from '../../router/constant';
import {styles} from '../styles';

const Home: FC = ({navigation}: any) => {
  return (
    <View
      style={[styles.page, {justifyContent: 'center', paddingHorizontal: 20}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.Users)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>CRUD User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.Articles)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>CRUD Artikel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
