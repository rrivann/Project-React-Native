/* eslint-disable react-native/no-inline-styles */
import {useQuery} from '@apollo/client';
import React, {FC} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {Text} from '../../../components';
import {READ_POST} from '../../../services';
import {colors} from '../../../utils';
import {styles} from '../../styles';

const ReadUsers: FC = () => {
  const {loading, data, refetch} = useQuery(READ_POST);

  return (
    <View style={[styles.page, {justifyContent: 'center'}]}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.black} />
      ) : (
        <FlatList
          data={[...data.posts].sort((a, b) => a.uid - b.uid)}
          keyExtractor={v => v.id}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: 20,
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                marginVertical: 10,
              }}>
              <Text>Uid User: {item.uid}</Text>
              <Text>Id Post: {item.id}</Text>
              <Text>Title: {item.title}</Text>
              <Text>Body: {item.body}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
          }
        />
      )}
    </View>
  );
};

export default ReadUsers;
