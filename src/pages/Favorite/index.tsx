/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, Text} from '../../components';
import {
  deleteContactFavorite,
  deleteDataContactFavorite,
  useAppSelector,
} from '../../redux';
import {colors, IconEntypo, IconFontAwesome} from '../../utils';
import {styles} from '../styles';

interface itemFavoriteProps {
  number?: any;
  image?: any;
  name?: any;
  deleteFavorite?: any;
}

const ItemFavorite: FC<itemFavoriteProps> = ({
  number,
  image,
  name,
  deleteFavorite,
}) => {
  return (
    <View
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
    </View>
  );
};

const Favorite: FC = () => {
  const dispatch = useDispatch();
  const {phoneBook} = useAppSelector(s => s);

  const renderItem = ({item, index}) => {
    return (
      <ItemFavorite
        number={index + 1}
        name={item.name}
        image={item.image}
        deleteFavorite={() => {
          dispatch(deleteContactFavorite(item.id));
          dispatch(deleteDataContactFavorite(item.id));
        }}
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
          Favorite
        </Text>
      </View>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
        data={phoneBook.dataFavorite}
        ListFooterComponent={<Gap height={20} />}
        ListHeaderComponent={<Gap height={20} />}
        keyExtractor={v => v.id}
        renderItem={renderItem}
      />
    </>
  );
};

export default Favorite;
