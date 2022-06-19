/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/core';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Text, TextInput} from '../../components';
import {
  onLogoutPhoneBook,
  UpdateProfileAction,
  UpdateProfilePasswordAction,
  useAppSelector,
} from '../../redux';
import {ROUTER} from '../../router/constant';
import {colors, getData, removeData, ShowToast} from '../../utils';

const Profile: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {phoneBook} = useAppSelector(s => s);
  const [formData, setFormData]: any = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [isSecure, setIsSecure] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getData('token').then(res => {
        setFormData({name: res.name, email: res.email});
      });
    }, []),
  );

  useEffect(() => {
    if (phoneBook.loading === false) {
      getData('token').then(data => {
        setFormData({name: data.name, email: data.email});
      });
    }
  }, [phoneBook.loading]);

  const onChangeFormData = (key: any, value: any) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const submitAction = async () => {
    if (formData?.password?.length > 0) {
      if (formData?.password?.length < 8) {
        ShowToast('Password anda harus lebih dari 8');
      } else {
        if (formData?.password === formData?.password_confirmation) {
          getData('token').then(res => {
            dispatch(UpdateProfileAction(formData, res.token));
            dispatch(
              UpdateProfilePasswordAction(formData?.password, res.token),
            );
            setFormData({
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
            });
          });
        } else {
          ShowToast('Password is not match');
        }
      }
    } else {
      getData('token').then(res => {
        if (formData?.name !== res.name || formData?.email !== res.email) {
          getData('token').then(result => {
            dispatch(UpdateProfileAction(formData, result.token));
            setFormData({
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
            });
          });
        } else {
          ShowToast('Data anda tidak berubah');
        }
      });
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <Text h1 whiteColor center>
          Edit Profile
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: colors.white,
        }}>
        <TextInput
          label="Name"
          value={formData?.name}
          onChangeText={(v: any) => onChangeFormData('name', v)}
        />
        <Gap height={10} />
        <TextInput
          label="Email"
          value={formData?.email}
          onChangeText={(v: any) => onChangeFormData('email', v)}
        />
        <Gap height={10} />
        <TextInput
          secure
          isSecured={isSecure}
          toggleSecure={() => setIsSecure(!isSecure)}
          label="Password"
          value={formData?.password}
          onChangeText={(v: any) => onChangeFormData('password', v)}
        />
        <Gap height={10} />
        <TextInput
          secure
          isSecured={isSecure2}
          toggleSecure={() => setIsSecure2(!isSecure2)}
          label="Password Confirmation"
          value={formData?.password_confirmation}
          onChangeText={(v: any) =>
            onChangeFormData('password_confirmation', v)
          }
        />
        <Gap height={30} />
        <Button
          isLoading={phoneBook.loading}
          title="Update Profile"
          onPress={submitAction}
        />
        <Gap height={30} />
        <Button
          width="30%"
          style={{alignSelf: 'center'}}
          title="Logout"
          onPress={() =>
            removeData('token').then(() => {
              navigation.reset({index: 0, routes: [{name: ROUTER.Splash}]});
              dispatch(onLogoutPhoneBook());
            })
          }
        />
      </ScrollView>
    </>
  );
};

export default Profile;
