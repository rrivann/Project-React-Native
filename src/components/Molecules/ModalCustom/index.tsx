/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from '../../Atoms';

interface ModalCustomProps {
  modalVisible: any;
  setModalVisible: any;
  addPhotoCamera: any;
  addPhotoGallery: any;
}

const ModalCustom: FC<ModalCustomProps> = ({
  modalVisible = false,
  setModalVisible,
  addPhotoCamera,
  addPhotoGallery,
}) => {
  return (
    <Modal visible={modalVisible} transparent={true}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
        onPress={setModalVisible}>
        <TouchableOpacity activeOpacity={1}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              paddingHorizontal: 100,
            }}>
            <Text
              onPress={addPhotoCamera}
              style={{marginBottom: 20, textAlign: 'center'}}>
              Camera
            </Text>

            <Text style={{textAlign: 'center'}} onPress={addPhotoGallery}>
              Galeri
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalCustom;

// const [modalVisible, setModalVisible] = useState(false);
// const [photo, setPhoto]: any = useState('');
// const [photoForDB, setPhotoForDB]: any = useState('');

// const addPhotoGallery = () => {
//   let options: any = {
//     maxWidth: 200,
//     maxHeight: 200,
//     quality: 0.8,
//   };

//   launchImageLibrary(options, response => {
//     // console.log('Response = ', response);

//     if (response.didCancel) {
//       // ShowToast('Anda tidak memilih photo');
//     } else if (response.errorCode == 'camera_unavailable') {
//       // ShowToast('Cameranya tidak ada');
//     } else if (response.errorCode == 'permission') {
//       // ShowToast('Anda belum menyetujui access nya');
//     } else if (response.errorCode == 'others') {
//       // ShowToast(response.errorMessage);
//     } else {
//       const file_path = response.uri;
//       const dataImage = {
//         name: response.fileName,
//         type: response.type,
//         uri: response.uri,
//       };
//       setPhoto(file_path);
//       setPhotoForDB(dataImage);
//       setModalVisible(false);
//     }
//   });
// };

// const addPhotoCamera = async () => {
//   let options: any = {
//     maxWidth: 200,
//     maxHeight: 200,
//     quality: 0.8,
//   };
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Cool Photo App Camera Permission',
//         message:
//           'Cool Photo App needs access to your camera ' +
//           'so you can take awesome pictures.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // console.log("You can use the camera");
//       launchCamera(options, response => {
//         // console.log('Response = ', response);

//         if (response.didCancel) {
//           console.log('Anda tidak memilih photo');
//         } else if (response.errorCode == 'camera_unavailable') {
//           console.log('Cameranya tidak ada');
//         } else if (response.errorCode == 'permission') {
//           console.log('Anda belum menyetujui access nya');
//         } else {
//           const file_path = response.uri;
//           const dataImage = {
//             name: response.fileName,
//             type: response.type,
//             uri: response.uri,
//           };
//           setPhoto(file_path);
//           setPhotoForDB(dataImage);
//           setModalVisible(false);
//         }
//       });
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };
