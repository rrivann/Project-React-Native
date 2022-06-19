/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {Image, View} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import {KongPic, TenetPic, TheHolyPic} from '../../assets';
import {Gap, Text} from '../../components';
import {useAppSelector} from '../../redux';
import {colors} from '../../utils';

const MyTicket: FC = () => {
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
            {movie.showTime} PM
          </Text>
        </View>
        <Gap height={36} />
        <Text style={{color: '#777777'}} h3>
          Booking Code
        </Text>
        {movie.loading ? null : (
          <>
            <Text>{movie.dataTicket?.ticketCode}</Text>
            <Barcode value={movie.dataTicket?.ticketCode} format="CODE128" />
          </>
        )}

        <Gap height={55} />
      </View>
    </View>
  );
};

export default MyTicket;
