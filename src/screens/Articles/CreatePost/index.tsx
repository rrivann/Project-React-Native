/* eslint-disable react-native/no-inline-styles */
import {useMutation} from '@apollo/client';
import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Gap, TextInput} from '../../../components';
import {CREATE_POST} from '../../../services';
import {HEIGHT, ShowToast} from '../../../utils';
import {styles} from '../../styles';

const CreateUsers: FC = () => {
  const [formData, setFormData] = useState({
    body: '',
    title: '',
    uid: '',
  });

  const [createPost, {loading, called, error}] = useMutation(CREATE_POST);

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
      createPost({variables: {...formData}});
      setFormData({
        body: '',
        title: '',
        uid: '',
      });
    }
  };

  return (
    <View
      style={[styles.page, {justifyContent: 'center', paddingHorizontal: 20}]}>
      <TextInput
        label="Uid User"
        value={formData.uid}
        onChangeText={(v: any) => onChangeFormData('uid', v)}
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
        multiline
        style={{height: HEIGHT * 0.1, paddingVertical: 5}}
      />
      <Gap height={30} />
      <Button title="Create Post" onPress={onSubmit} isLoading={loading} />
    </View>
  );
};

export default CreateUsers;
