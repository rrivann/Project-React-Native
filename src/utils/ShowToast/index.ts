import {ToastAndroid} from 'react-native';

export const ShowToast = (message: any) => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};
