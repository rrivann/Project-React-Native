/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/core';
import React, {FC, useCallback} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {Gap, Text} from '../../components';
import {useAppSelector} from '../../redux';
import {
  addContactFavorite,
  addDataContactFavorite,
  DeleteContactAction,
  deleteContactFavorite,
  deleteDataContactFavorite,
  GetAllContactAction,
} from '../../redux/slice/phoneBook';
import {ROUTER} from '../../router/constant';
import {colors, getData, IconEntypo, IconFontAwesome} from '../../utils';
import {styles} from '../styles';

interface itemHomeProps {
  number?: any;
  image?: any;
  name?: any;
  deleteContact?: any;
  favorite?: any;
  addFavorite?: any;
  deleteFavorite?: any;
  onPress?: any;
}

const ItemHome: FC<itemHomeProps> = ({
  number,
  image,
  name,
  deleteContact,
  favorite,
  addFavorite,
  deleteFavorite,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 20,
      }}>
      <View style={[styles.rowCenter]}>
        <Text whiteColor>{number}</Text>
        <Gap width={20} />
        {image !== '' && image !== null ? (
          <Image
            source={{uri: image}}
            style={{height: 80, width: 80, borderRadius: 80}}
          />
        ) : (
          <IconFontAwesome name="user-circle" size={70} color={colors.white} />
        )}
        <Gap width={20} />
        <Text whiteColor>{name}</Text>
      </View>
      <View style={styles.rowCenter}>
        {favorite ? (
          <TouchableOpacity
            onPress={deleteFavorite}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconEntypo name="star" size={20} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={addFavorite}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconEntypo name="star-outlined" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
        <Gap width={20} />
        <Text whiteColor onPress={deleteContact}>
          Delete
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Home: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {phoneBook} = useAppSelector(s => s);

  useFocusEffect(
    useCallback(() => {
      getData('token').then(res => {
        dispatch(GetAllContactAction(res.token));
      });
    }, [dispatch]),
  );

  const renderItem = ({item, index}) => {
    return (
      <ItemHome
        number={index + 1}
        name={item.name}
        image={item.image}
        deleteContact={() => {
          getData('token').then(res => {
            dispatch(DeleteContactAction(res.token, item.id));
            dispatch(deleteContactFavorite(item.id));
            dispatch(deleteDataContactFavorite(item.id));
          });
        }}
        favorite={phoneBook.favorite.includes(item.id)}
        addFavorite={() => {
          dispatch(addContactFavorite(item.id));
          dispatch(addDataContactFavorite(item));
        }}
        deleteFavorite={() => {
          dispatch(deleteContactFavorite(item.id));
          dispatch(deleteDataContactFavorite(item.id));
        }}
        onPress={() => navigation.navigate(ROUTER.EditContact, item)}
      />
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <Text h1 whiteColor center>
          List Contact
        </Text>
      </View>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
        data={phoneBook.data}
        ListFooterComponent={<Gap height={20} />}
        ListHeaderComponent={<Gap height={20} />}
        keyExtractor={v => v.id}
        renderItem={renderItem}
      />
    </>
  );
};

export default Home;
