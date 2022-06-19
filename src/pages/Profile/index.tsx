/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Gap, Text} from '../../components';
import {styles} from '../styles';
import auth from '@react-native-firebase/auth';
import {
  colors,
  getData,
  IconMaterialCommunityIcons,
  removeData,
} from '../../utils';
import {ROUTER} from '../../router/constant';
import {useDispatch} from 'react-redux';
import {onLogout} from '../../redux';

const Profile: FC = ({navigation}: any) => {
  const [profile, setProfile]: any = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    getData('profile').then(res => {
      setProfile(res);
    });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.reset({index: 0, routes: [{name: ROUTER.splash}]});
      })
      .finally(() => {
        dispatch(onLogout());
        removeData('profile');
      });
  };
  return (
    <View style={[styles.page]}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: colors.primary,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <View>
          <Text whiteColor>{profile?.email}</Text>
          <Text whiteColor>{profile?.nama}</Text>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={signOut}
          activeOpacity={0.8}
          style={[styles.rowCenter, {marginHorizontal: 10}]}>
          <IconMaterialCommunityIcons
            name="logout"
            size={24}
            color={colors.primary}
          />
          <Gap width={10} />
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
