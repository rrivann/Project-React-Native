/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {FC} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Text} from '../../components';
import {addAbsenOut, useAppSelector} from '../../redux';
import {IconMaterialIcon, ShowToast} from '../../utils';
import {styles} from '../styles';

const AbsenOut: FC = () => {
  const dispatch = useDispatch();
  const {absen} = useAppSelector(s => s);
  const jamTemp = parseInt(absen.dataAbsenTemp?.absenIn?.split(':')[0]);
  const jamNow = parseInt(dayjs().format('HH'));
  const menitTemp = parseInt(absen.dataAbsenTemp?.absenIn?.split(':')[1]);
  const menitNow = parseInt(dayjs().format('mm'));

  const onSubmit = async () => {
    const hasilJam = jamTemp > jamNow ? jamTemp - jamNow : jamNow - jamTemp;
    const hasilMenit =
      menitTemp > menitNow ? menitTemp - menitNow : menitNow - menitTemp;

    const form = {
      uid: absen.dataAbsenTemp.idSet,
      absenOut: dayjs().format('HH:mm'),
      lamaKerja: `${hasilJam} Jam ${hasilMenit} Menit`,
    };
    if (absen.doneAbsenIn === true) {
      dispatch(addAbsenOut(form));
    } else {
      ShowToast('Anda harus Absen In terlebih dahulu');
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
            Sukses Absen Out
          </Text>
          <Gap height={10} />
          <IconMaterialIcon name="check-circle" size={30} color="green" />
        </>
      ) : (
        <Button
          title="Absen Out"
          onPress={onSubmit}
          isLoading={absen.loading}
        />
      )}
    </View>
  );
};

export default AbsenOut;
