import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {HOST} from '../../config';
import {ROUTER} from '../../router/constant';
import {ShowToast, storeData} from '../../utils';

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
    onLogoutAuth: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onStartAuth, onFinishAuth, onLogoutAuth} = authSlice.actions;

export const SignInAction = (form: any, navigation: any) => (dispatch: any) => {
  dispatch(onStartAuth());
  axios
    .post(`${HOST}signin`, form)
    .then(res => {
      storeData('token', res.data.data);
      navigation.reset({index: 0, routes: [{name: ROUTER.Bottom}]});
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishAuth()));
};

export const SignUpAction = (form: any, navigation: any) => (dispatch: any) => {
  dispatch(onStartAuth());
  axios
    .post(`${HOST}signup`, form)
    .then(res => {
      storeData('token', {
        name: form.name,
        email: form.email,
        token: res.data.data,
      });
      navigation.reset({index: 0, routes: [{name: ROUTER.Bottom}]});
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishAuth()));
};
