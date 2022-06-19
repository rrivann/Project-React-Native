/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {Button, Gap, ModalCustom, Text, TextInput} from '../../components';
import {SaveContactAction, useAppSelector} from '../../redux';
import {colors, getData, IconFontAwesome, ShowToast} from '../../utils';

const AddContact: FC = () => {
  const dispatch = useDispatch();
  const {phoneBook} = useAppSelector(s => s);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    job: '',
    company: '',
    email: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto]: any = useState('');
  const [photoForDB, setPhotoForDB]: any = useState('');

  const addPhotoGallery = () => {
    let options: any = {};

    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // ShowToast('Anda tidak memilih photo');
      } else if (response.errorCode === 'camera_unavailable') {
        // ShowToast('Cameranya tidak ada');
      } else if (response.errorCode === 'permission') {
        // ShowToast('Anda belum menyetujui access nya');
      } else if (response.errorCode === 'others') {
        // ShowToast(response.errorMessage);
      } else {
        const file_path = response.uri;
        // const dataImage = {
        //   name: response.fileName,
        //   type: response.type,
        //   uri: response.uri,
        // };
        setPhoto(file_path);
        setPhotoForDB(file_path);
        setModalVisible(false);
      }
    });
  };

  const addPhotoCamera = async () => {
    let options: any = {};
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the camera");
        launchCamera(options, response => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('Anda tidak memilih photo');
          } else if (response.errorCode === 'camera_unavailable') {
            console.log('Cameranya tidak ada');
          } else if (response.errorCode === 'permission') {
            console.log('Anda belum menyetujui access nya');
          } else {
            const file_path = response.uri;
            // const dataImage = {
            //   name: response.fileName,
            //   type: response.type,
            //   uri: response.uri,
            // };
            setPhoto(file_path);
            setPhotoForDB(file_path);
            setModalVisible(false);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onChangeFormData = (key: any, value: any) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const submitAction = () => {
    if (
      formData.name &&
      formData.phone &&
      formData.job &&
      formData.company &&
      formData.email
    ) {
      getData('token').then(res => {
        dispatch(
          SaveContactAction({...formData, image: photoForDB}, res.token),
        );
        setFormData({
          name: '',
          phone: '',
          job: '',
          company: '',
          email: '',
        });
        setPhoto('');
        setPhotoForDB('');
      });
    } else {
      ShowToast('your data not completed');
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <Text h1 whiteColor center>
          Add Contact
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: colors.white,
        }}>
        {photo !== '' ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{uri: photo}}
              style={{
                height: 100,
                width: 100,
                alignSelf: 'center',
                borderRadius: 100,
              }}
              resizeMethod="auto"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => setModalVisible(true)}>
            <IconFontAwesome name="user-circle" size={100} />
          </TouchableOpacity>
        )}
        <Gap height={20} />
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(v: any) => onChangeFormData('name', v)}
        />
        <Gap height={10} />
        <TextInput
          label="Phone"
          value={formData.phone}
          onChangeText={(v: any) => onChangeFormData('phone', v)}
          keyboardType="phone-pad"
        />
        <Gap height={10} />
        <TextInput
          label="Job"
          value={formData.job}
          onChangeText={(v: any) => onChangeFormData('job', v)}
        />
        <Gap height={10} />
        <TextInput
          label="Company"
          value={formData.company}
          onChangeText={(v: any) => onChangeFormData('company', v)}
        />
        <Gap height={10} />
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(v: any) => onChangeFormData('email', v)}
        />
        <Gap height={30} />
        <Button
          isLoading={phoneBook.loading}
          title="Save Contact"
          onPress={submitAction}
        />
        <Gap height={30} />
      </ScrollView>
      <ModalCustom
        modalVisible={modalVisible}
        addPhotoCamera={() => addPhotoCamera()}
        addPhotoGallery={() => addPhotoGallery()}
        setModalVisible={() => setModalVisible(false)}
      />
    </>
  );
};

export default AddContact;
