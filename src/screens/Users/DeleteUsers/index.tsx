/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {useMutation, useQuery} from '@apollo/client';
import React, {FC, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../../components';
import {DELETE_USER, READ_USER} from '../../../services';
import {colors, IconAntDesign, ShowToast} from '../../../utils';
import {styles} from '../../styles';

const DeleteUsers: FC = () => {
  const {loading, data, refetch} = useQuery(READ_USER);
  const [deleteUser, {error, called}] = useMutation(DELETE_USER);

  useEffect(() => {
    if (error) {
      ShowToast('Ada kesalahan');
    } else if (called && !error && loading === false) {
      ShowToast('success');
    }
  }, [called, error, loading]);

  return (
    <View style={[styles.page, {justifyContent: 'center'}]}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.black} />
      ) : (
        <FlatList
          data={[...data.users].sort((a, b) => a.id - b.id)}
          keyExtractor={v => v.id}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: 20,
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text>{item.id}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    deleteUser({variables: {id: parseInt(item.id)}});
                    refetch();
                  }}>
                  <IconAntDesign
                    name="closecircleo"
                    size={24}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
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

export default DeleteUsers;
