/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Gap, Text} from '../../components';
import {ROUTER} from '../../router/constant';
import {styles} from '../styles';

const Articles: FC = ({navigation}: any) => {
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
          onPress={() => navigation.navigate(ROUTER.CreatePost)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.ReadPost)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Read Post</Text>
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
          onPress={() => navigation.navigate(ROUTER.UpdatePost)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Update Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTER.DeletePost)}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text marginTop={3}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Articles;
