import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';
import {ROUTER} from '../../router/constant';
import {storeData} from '../../utils';
import {showMessage} from 'react-native-flash-message';

interface AuthState {
  loading: boolean;
}

const initialState = {
  loading: false,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onStartAuth: state => {
      state.loading = true;
    },
    onFinishAuth: state => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onStartAuth, onFinishAuth} = authSlice.actions;

const getDataFireStore = async (uid: any) => {
  const user = await firestore().collection('users').doc(uid).get();

  return {
    uid: uid,
    email: user.data()?.email,
    nama: user.data()?.nama,
  };
};

export const SignInAction = (form: any, navigation: any) => async (
  dispatch: any,
) => {
  dispatch(onStartAuth());
  try {
    const success = await auth().signInWithEmailAndPassword(
      form.email,
      form.password,
    );
    const user = await getDataFireStore(success.user.uid);
    storeData('profile', user);
    dispatch(onFinishAuth());
    navigation.reset({index: 0, routes: [{name: ROUTER.bottom}]});
  } catch (err) {
    showMessage({
      message: err.toString().split(']')[1].trim(),
      type: 'danger',
    });
    dispatch(onFinishAuth());
  }
};

const SetDoc = (form: any, uid: any) => {
  firestore().collection('users').doc(uid).set({
    email: form.email,
    nama: form.nama,
  });
};

export const SignUpAction = (form: any, navigation: any) => (dispatch: any) => {
  dispatch(onStartAuth());
  auth()
    .createUserWithEmailAndPassword(form.email, form.password)
    .then(success => {
      storeData('profile', {
        uid: success.user.uid,
        nama: form.nama,
        email: form.email,
      });
      SetDoc(form, success.user.uid);
      navigation.reset({index: 0, routes: [{name: ROUTER.bottom}]});
    })
    .catch(error => {
      showMessage({
        message: error.toString().split(']')[1].trim(),
        type: 'danger',
      });
    })
    .finally(() => {
      dispatch(onFinishAuth());
    });
};
