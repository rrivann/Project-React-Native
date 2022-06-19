/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Gap, Text} from '../../components';
import {ROUTER} from '../../router/constant';
import {styles} from '../styles';

const Users: FC = ({navigation}: any) => {
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
          onPress={() => navigation.navigate(ROUTER.CreateUsers)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Create Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.ReadUsers)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Read Users</Text>
        </TouchableOpacity>
      </View>
      <Gap height={20} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.UpdateUsers)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Update Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.DeleteUsers)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Delete Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Users;
