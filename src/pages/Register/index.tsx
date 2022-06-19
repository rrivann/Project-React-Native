/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, TextInput} from '../../components';
import {SignUpAction, useAppSelector} from '../../redux';
import {ShowToast} from '../../utils';
import {styles} from '../styles';

const Register: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {auth} = useAppSelector(s => s);
  const [isSecure, setIsSecure] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const onChangeFormData = (key: any, value: any) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const onSubmit = () => {
    if (formData.name === '') {
      ShowToast('Anda harus mengisi dengan lengkap');
    } else if (formData.password.length < 8) {
      ShowToast('Password anda harus lebih dari 8');
    } else {
      dispatch(SignUpAction(formData, navigation));
    }
  };

  return (
    <View
      style={[styles.page, {justifyContent: 'center', paddingHorizontal: 20}]}>
      <TextInput
        label="Nama"
        value={formData.name}
        onChangeText={(v: any) => onChangeFormData('name', v)}
      />
      <Gap height={10} />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(v: any) => onChangeFormData('email', v)}
      />
      <Gap height={10} />
      <TextInput
        label="Password"
        secure
        isSecured={isSecure}
        toggleSecure={() => setIsSecure(!isSecure)}
        value={formData.password}
        onChangeText={(v: any) => onChangeFormData('password', v)}
      />
      <Gap height={30} />
      <Button title="Daftar" onPress={onSubmit} isLoading={auth.loading} />
    </View>
  );
};

export default Register;