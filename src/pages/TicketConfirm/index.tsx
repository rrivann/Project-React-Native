/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {KongPic, TenetPic, TheHolyPic} from '../../assets';
import {Button, Gap, Text} from '../../components';
import {addShowTime, PostMovieTicketAction, useAppSelector} from '../../redux';
import {ROUTER} from '../../router/constant';
import {colors} from '../../utils';

const TicketConfirm: FC = ({route, navigation}: any) => {
  const data = route.params;
  const dispatch = useDispatch();
  const {movie} = useAppSelector(s => s);

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

  const onSubmit = () => {
    dispatch(PostMovieTicketAction(data.movieId, data.itemSelect.timeId));
    dispatch(addShowTime(data.itemSelect.showTime));
    navigation.reset({
      index: 0,
      routes: [{name: ROUTER.myticket}],
    });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#F2F2F2',
        marginHorizontal: 23,
      }}>
      <View
        style={{
          borderRadius: 10,

          backgroundColor: colors.white,
          alignItems: 'center',
        }}>
        <Gap height={24} />
        <Text h3 bold>
          {movie.dataDetail.title}
        </Text>
        <Gap height={18} />
        <Image
          style={{height: 150, width: 100, borderRadius: 10}}
          source={imageSwitch(movie.dataDetail.movieId)}
        />
        <Gap height={18} />
        <Text>Studio</Text>
        <Text bold h3>
          {movie.dataDetail.studio}
        </Text>
        <Gap height={5} />
        <Text h3 bold>
          {dayjs().format('dddd, DD MMM YYYY')}
        </Text>
        <Gap height={5} />
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
          }}>
          <Text h4 bold>
            {data.itemSelect.showTime} PM
          </Text>
        </View>
        <Gap height={28} />
        <Button
          title="Confirm"
          style={{paddingHorizontal: -24}}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default TicketConfirm;
