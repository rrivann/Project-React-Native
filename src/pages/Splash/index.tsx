import React, {FC, useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {Gap, Text} from '../../components';
import {colors} from '../../utils';
import {styles} from '../styles';

interface Splash {
  navigation: any;
}

const Splash: FC<Splash> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.pageSplash}>
      <StatusBar backgroundColor={colors.primary} />
      <Gap height={30} />
      <Text h1 center whiteColor>
        MovieQue
      </Text>
      <Gap height={30} />
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

export default Splash;
