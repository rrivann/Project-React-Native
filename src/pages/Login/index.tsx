/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Text, TextInput} from '../../components';
import {SignInAction, useAppSelector} from '../../redux';
import {ROUTER} from '../../router/constant';
import {colors, ShowToast} from '../../utils';
import {styles} from '../styles';

const Login: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {auth} = useAppSelector(s => s);
  const [isSecure, setIsSecure] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
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
    if (formData.email === '' && formData.password === '') {
      ShowToast('Anda harus mengisi dengan lengkap');
    } else if (formData.password.length < 8) {
      ShowToast('Password anda harus lebih dari 8');
    } else {
      dispatch(SignInAction(formData, navigation));
    }
  };

  return (
    <View
      style={[styles.page, {justifyContent: 'center', paddingHorizontal: 20}]}>
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
      <Button title="Login" onPress={onSubmit} isLoading={auth.loading} />
      <Gap height={20} />
      <View style={[styles.rowCenter, {alignSelf: 'center'}]}>
        <Text>Jika anda belum memiliki akun?</Text>
        <Gap width={5} />
        <Text
          onPress={() => {
            setFormData({
              email: '',
              password: '',
            });
            navigation.navigate(ROUTER.Register);
          }}
          textColor={colors.primary}>
          Daftar.
        </Text>
      </View>
    </View>
  );
};

export default Login;
