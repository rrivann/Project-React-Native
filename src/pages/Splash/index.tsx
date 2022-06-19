import React, {FC, useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {Gap, Text} from '../../components';
import {ROUTER} from '../../router/constant';
import {colors, getData} from '../../utils';
import {styles} from '../styles';

interface Splash {
  navigation?: any;
}

const Splash: FC<Splash> = ({navigation}) => {
  useEffect(() => {
    getData('token').then(res => {
      setTimeout(() => {
        if (res) {
          navigation.reset({index: 0, routes: [{name: ROUTER.Bottom}]});
        } else {
          navigation.reset({index: 0, routes: [{name: ROUTER.Login}]});
          // navigation.replace(ROUTER.Login);
        }
      }, 2000);
    });
  }, [navigation]);

  return (
    <View style={styles.pageSplash}>
      <StatusBar backgroundColor={colors.primary} />
      <Gap height={30} />
      <Text center h1 whiteColor>
        PhoneBook
      </Text>
      <Gap height={30} />
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

export default Splash;
