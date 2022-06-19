/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {FC, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {KongPic, TenetPic, TheHolyPic} from '../../assets';
import {Button, Gap, Text} from '../../components';
import {useAppSelector} from '../../redux';
import {ROUTER} from '../../router/constant';
import {
  colors,
  IconEntypo,
  IconMaterialCommunityIcons,
  ShowToast,
} from '../../utils';

const DetailMovie: FC = ({route, navigation}: any) => {
  const id = route.params;
  const {movie} = useAppSelector(s => s);
  const [itemSelect, SetItemSelect] = useState({
    timeId: '',
    showTime: '',
  });

  const onSubmit = () => {
    if (itemSelect.timeId !== '') {
      navigation.navigate(ROUTER.ticketConfirm, {
        movieId: id,
        itemSelect: itemSelect,
      });
    } else {
      ShowToast('You not choose the date');
    }
  };

  const imageSwitch = (idPic: number) => {
    switch (idPic) {
      case 1:
        return KongPic;
      case 2:
        return TheHolyPic;
      case 3:
        return TenetPic;
    }
  };

  const timeConvert = (n: number) => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'm';
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#F2F2F2',
        marginHorizontal: 26,
      }}>
      <StatusBar backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View>
          <Image
            style={{height: 150, width: 100, borderRadius: 10}}
            source={imageSwitch(movie.dataDetail.movieId)}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
            <IconMaterialCommunityIcons
              name="account"
              color={colors.primary}
              size={28}
            />
            <Gap width={5} />
            <Text style={{marginTop: 4}}>{movie.dataDetail.category}</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
            <IconMaterialCommunityIcons
              name="clock-time-five"
              color={colors.primary}
              size={28}
            />
            <Gap width={5} />
            <Text style={{marginTop: 4}}>
              {timeConvert(movie.dataDetail.duration)}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
            <IconEntypo name="star" color={colors.primary} size={28} />
            <Gap width={5} />
            <Text style={{marginTop: 4}}>{movie.dataDetail.rating}/10</Text>
          </View>
        </View>
        <Gap width={10} />
        <View style={{alignSelf: 'flex-start'}}>
          <Text h3 bold>
            {movie.dataDetail.title}
          </Text>
          <Text style={{maxWidth: '84%'}}>{movie.dataDetail.description}</Text>
        </View>
      </View>
      <Gap height={24} />
      <Text bold h3>
        Studio
      </Text>
      <Gap height={14} />
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 10,
        }}>
        <Text>{movie.dataDetail.studio}</Text>
      </View>
      <Gap height={24} />
      <Text h3 bold>
        {dayjs().format('dddd, DD MMM YYYY')}
      </Text>
      <Gap height={14} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movie.dataDetail.list_showtimes?.map((itm: any, index: any) => {
          return (
            <TouchableOpacity
              style={{
                marginRight:
                  movie.dataDetail.list_showtimes.length - 1 === index ? 0 : 25,
                borderRadius: 10,
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor:
                  itemSelect.timeId === itm.timeId
                    ? colors.primary
                    : colors.white,
              }}
              activeOpacity={0.9}
              onPress={() =>
                SetItemSelect({timeId: itm.timeId, showTime: itm.showTime})
              }
              key={itm.timeId}>
              <Text>{itm.showTime} PM</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Gap height={60} />
      <Button title="Book Ticket" onPress={onSubmit} />
    </ScrollView>
  );
};

export default DetailMovie;
