/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, Text} from '../../components';
import {changeAbsenIn} from '../../redux';
import {ROUTER} from '../../router/constant';
import {colors, getData, IconEntypo, IconMaterialIcon} from '../../utils';
import {styles} from '../styles';

const Home: FC = ({navigation}: any) => {
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

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(changeAbsenIn(false));
    });
  }, [dispatch, navigation]);

  return (
    <View style={styles.page}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: colors.primary,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Text whiteColor h2>
          Selamat Datang
        </Text>
        <View>
          <Text whiteColor>{profile?.email}</Text>
          <Text whiteColor>{profile?.nama}</Text>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={[
            styles.rowCenter,
            {
              justifyContent: 'space-evenly',
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTER.absenIn, profile)}
            style={{
              padding: 10,
              height: 100,
              width: 100,
              borderRadius: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconMaterialIcon name="input" size={24} color={colors.white} />
            <Gap height={10} />
            <Text whiteColor>AbsenIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTER.absenOut)}
            style={{
              padding: 10,
              height: 100,
              width: 100,
              borderRadius: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconMaterialIcon name="input" size={24} color={colors.white} />
            <Gap height={10} />
            <Text whiteColor>AbsenOut</Text>
          </TouchableOpacity>
        </View>
        <Gap height={40} />
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.dataAbsen, profile)}
          style={{
            padding: 10,
            height: 100,
            width: 100,
            borderRadius: 10,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <IconEntypo name="database" size={24} color={colors.white} />
          <Gap height={10} />
          <Text center whiteColor>
            Data Absen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
