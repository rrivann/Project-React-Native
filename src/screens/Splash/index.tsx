import React, {FC, useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {Gap, Text} from '../../components';
import {ROUTER} from '../../router/constant';
import {colors} from '../../utils';
import {styles} from '../styles';

interface Splash {
  navigation?: any;
}

const Splash: FC<Splash> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: ROUTER.Home}]});
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.screenSplash}>
      <StatusBar backgroundColor={colors.primary} />
      <Gap height={30} />
      <Text center h1 whiteColor>
        Welcome
      </Text>
      <Gap height={30} />
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

export default Splash;
