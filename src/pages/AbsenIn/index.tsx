/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Text} from '../../components';
import {addAbsenIn, useAppSelector} from '../../redux';
import {IconMaterialIcon, ShowToast} from '../../utils';
import {styles} from '../styles';

const AbsenIn: FC = ({route}: any) => {
  const data = route.params;
  const dispatch = useDispatch();
  const {absen} = useAppSelector(s => s);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSecond(dayjs().format('HH:mm - ss'));
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // useEffect(() => {
  //   dispatch(getDataAbsen(data.uid));
  // }, [data.uid, dispatch]);

  const onSubmit = async () => {
    const form = {
      idSet: Math.random().toString(36).substr(2, 12),
      uid: data.uid,
      nama: data.nama,
      tanggal: dayjs().format('DD MMM YYYY'),
      absenIn: dayjs().format('HH:mm'),
    };
    if (absen.doneAbsenIn === false) {
      dispatch(addAbsenIn(form));
    } else {
      ShowToast('Anda harus Absen Out terlebih dahulu');
    }
  };

  return (
    <View
      style={[styles.page, {justifyContent: 'center', alignItems: 'center'}]}>
      <Text>{dayjs().format('DD MMM YYYY - HH:mm')}</Text>
      <Gap height={20} />
      {absen.successAbsen ? (
        <>
          <Text h3 textColor="green">
            Sukses Absen In
          </Text>
          <Gap height={10} />
          <IconMaterialIcon name="check-circle" size={30} color="green" />
        </>
      ) : (
        <Button title="Absen In" onPress={onSubmit} isLoading={absen.loading} />
      )}
    </View>
  );
};

export default AbsenIn;
