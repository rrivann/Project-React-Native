import auth from '@react-native-firebase/auth';
import React, {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Gap, Text} from '../../components';
import {ROUTER} from '../../router/constant';
import {colors} from '../../utils';
import {styles} from '../styles';

interface Splash {
  navigation: any;
}

const Splash: FC<Splash> = ({navigation}) => {
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.reset({index: 0, routes: [{name: ROUTER.bottom}]});
        } else {
          navigation.replace(ROUTER.login);
        }
      }, 2000);
    });
    return () => subscriber();
  }, [navigation]);

  return (
    <View style={styles.pageSplash}>
      <Gap height={30} />
      <Text center h1 whiteColor>
        AbsenKu
      </Text>
      <Gap height={30} />
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

export default Splash;
