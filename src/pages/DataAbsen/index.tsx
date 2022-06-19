/* eslint-disable react-native/no-inline-styles */
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, Text} from '../../components';
import {getDataAbsen, useAppSelector} from '../../redux';
import {colors, IconAntDesign, WIDTH} from '../../utils';
import {styles} from '../styles';

const DataAbsen: FC = ({route}: any) => {
  const dispatch = useDispatch();
  const {absen} = useAppSelector(s => s);
  const [firstDate, setFirstDate] = useState(
    new Date(dayjs().subtract(1, 'day').format('DD MMM YYYY')),
  );
  const [showFirst, setShowFirst] = useState(false);
  const [secondDate, setSecondDate] = useState(new Date());
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    dispatch(getDataAbsen(route.params.uid));
  }, [dispatch, route.params.uid]);

  const renderItem = ({item}: any) => {
    return (
      <View
        style={[
          styles.rowCenter,
          {
            marginBottom: 10,
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            borderBottomWidth: 1,
          },
        ]}>
        <View style={{width: WIDTH * 0.1}}>
          <Text>{item.nama}</Text>
        </View>
        <View style={{width: WIDTH * 0.2}}>
          <Text>{item.tanggal}</Text>
        </View>
        <View style={{width: WIDTH * 0.1}}>
          <Text>{item.absenIn}</Text>
        </View>
        <View style={{width: WIDTH * 0.1}}>
          <Text>{item.absenOut !== '' ? item.absenOut : '-'}</Text>
        </View>
        <View style={{width: WIDTH * 0.25}}>
          <Text>{item.lamaKerja !== '' ? item.lamaKerja : '-'}</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={[
          styles.rowCenter,
          {
            backgroundColor: colors.second,
            paddingHorizontal: 5,
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{width: WIDTH * 0.11}}>
          <Text>nama</Text>
        </View>
        <View style={{width: WIDTH * 0.2}}>
          <Text>Tanggal</Text>
        </View>
        <View style={{width: WIDTH * 0.12}}>
          <Text>Absen In</Text>
        </View>
        <View style={{width: WIDTH * 0.12}}>
          <Text>Absen Out</Text>
        </View>
        <View style={{width: WIDTH * 0.25}}>
          <Text>Lama Kerja</Text>
        </View>
      </View>
    );
  };

  const RenderDateTimePickerFirst = () => {
    return (
      <>
        <DateTimePicker
          value={firstDate}
          onChange={(event, date: any) => {
            if (event.type !== 'dismissed') {
              setFirstDate(date);
            }
            setShowFirst(false);
          }}
        />
      </>
    );
  };

  const RenderDateTimePickerSecond = () => {
    return (
      <>
        <DateTimePicker
          value={secondDate}
          onChange={(event, date: any) => {
            if (event.type !== 'dismissed') {
              setSecondDate(date);
            }
            setShowSecond(false);
          }}
        />
      </>
    );
  };

  const month = (num: any) => {
    switch (num) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'Mei';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Agu';
      case 9:
        return 'Sep';
      case 10:
        return 'Okt';
      case 11:
        return 'Nov';
      case 12:
        return 'Des';
    }
  };

  return (
    <>
      <View style={styles.page}>
        <View style={[styles.rowCenter, {marginTop: 10}]}>
          <Gap width={10} />
          <TouchableOpacity
            onPress={() => setShowFirst(true)}
            activeOpacity={0.8}
            style={{
              borderWidth: 1,
              padding: 5,
              justifyContent: 'space-evenly',
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text>{`${firstDate?.getDate()} ${month(
              firstDate?.getMonth() + 1,
            )} ${firstDate?.getFullYear()}`}</Text>
            <IconAntDesign name="calendar" size={20} />
          </TouchableOpacity>
          <Gap width={10} />
          <TouchableOpacity
            onPress={() => setShowSecond(true)}
            activeOpacity={0.8}
            style={{
              borderWidth: 1,
              padding: 5,
              justifyContent: 'space-evenly',
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text>{`${secondDate?.getDate()} ${month(
              secondDate?.getMonth() + 1,
            )} ${secondDate?.getFullYear()}`}</Text>
            <IconAntDesign name="calendar" size={20} />
          </TouchableOpacity>
          <Gap width={10} />
        </View>
        <Gap height={15} />
        <FlatList
          ListHeaderComponent={renderHeader}
          keyExtractor={(item: any, index: any) => 'key' + index}
          data={absen.dataAbsen.filter((data: any) => {
            let dataDate = new Date(data.tanggal);
            return dataDate >= firstDate && dataDate <= secondDate;
          })}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{marginTop: 10}}>
              <Text center>Data tidak ditemukan</Text>
            </View>
          }
        />
      </View>
      {showFirst && <RenderDateTimePickerFirst />}
      {showSecond && <RenderDateTimePickerSecond />}
    </>
  );
};

export default DataAbsen;
