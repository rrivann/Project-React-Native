/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {useMutation} from '@apollo/client';
import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Gap, TextInput} from '../../../components';
import {UPDATE_POST} from '../../../services';
import {ShowToast} from '../../../utils';
import {styles} from '../../styles';

const UpdateUsers: FC = () => {
  const [formData, setFormData] = useState({
    uid: '',
    id: '',
    body: '',
    title: '',
  });

  const [UpdatePost, {loading, called, error}] = useMutation(UPDATE_POST);

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
    if (formData.uid === '' && formData.body === '' && formData.title === '') {
      ShowToast('Anda harus mengisi dengan lengkap');
    } else {
      UpdatePost({variables: {...formData}});
      setFormData({
        uid: '',
        id: '',
        body: '',
        title: '',
      });
    }
  };

  return (
    <View
      style={[styles.page, {justifyContent: 'center', paddingHorizontal: 20}]}>
      <TextInput
        label="Uid User"
        value={formData.uid}
        onChangeText={(v: any) => onChangeFormData('uid', parseInt(v))}
      />
      <Gap height={10} />
      <TextInput
        label="Id Post"
        value={formData.id}
        onChangeText={(v: any) => onChangeFormData('id', parseInt(v))}
      />
      <Gap height={10} />
      <TextInput
        label="Title"
        value={formData.title}
        onChangeText={(v: any) => onChangeFormData('title', v)}
      />
      <Gap height={10} />
      <TextInput
        label="Body"
        value={formData.body}
        onChangeText={(v: any) => onChangeFormData('body', v)}
      />
      <Gap height={30} />
      <Button title="Update Post" onPress={onSubmit} isLoading={loading} />
    </View>
  );
};

export default UpdateUsers;
