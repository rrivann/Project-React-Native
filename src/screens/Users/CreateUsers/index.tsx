/* eslint-disable react-native/no-inline-styles */
import {useMutation} from '@apollo/client';
import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Gap, TextInput} from '../../../components';
import {CREATE_USER} from '../../../services';
import {ShowToast} from '../../../utils';
import {styles} from '../../styles';

const CreateUsers: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });

  const [createUser, {loading, called, error}] = useMutation(CREATE_USER);

  useEffect(() => {
    if (error) {
      ShowToast('Ada kesalahan');
    } else if (called && !error && loading === false) {
      ShowToast('success');
    }
  }, [called, error, loading]);

  const onChangeFormData = (key: any, value: any) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const onSubmit = () => {
    if (formData.email === '' && formData.name === '') {
      ShowToast('Anda harus mengisi dengan lengkap');
    } else {
      createUser({variables: {...formData}});
      setFormData({
        email: '',
        name: '',
      });
    }
  };

  return (
    <View
      style={[styles.page, {justifyContent: 'center', paddingHorizontal: 20}]}>
      {/* <TextInput
        label="Id"
        value={formData.id}
        onChangeText={(v: any) => onChangeFormData('id', v)}
      />
      <Gap height={10} /> */}
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(v: any) => onChangeFormData('email', v)}
      />
      <Gap height={10} />
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(v: any) => onChangeFormData('name', v)}
      />
      <Gap height={30} />
      <Button title="Create Users" onPress={onSubmit} isLoading={loading} />
    </View>
  );
};

export default CreateUsers;
