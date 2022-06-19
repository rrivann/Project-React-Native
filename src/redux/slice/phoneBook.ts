import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {HOST} from '../../config';
import {ROUTER} from '../../router/constant';
import {ShowToast, storeData} from '../../utils';

interface PhoneBookState {
  loading: boolean;
  data: any;
  favorite: any;
  dataFavorite: any;
}

const initialState = {
  loading: false,
  data: [],
  favorite: [],
  dataFavorite: [],
} as PhoneBookState;

export const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    onStartPhoneBook: state => {
      state.loading = true;
    },
    onFinishPhoneBook: state => {
      state.loading = false;
    },
    onLogoutPhoneBook: () => {
      return initialState;
    },
    getAllContactData: (state, {payload}) => {
      state.data = payload;
    },
    addContactFavorite: (state, {payload}) => {
      state.favorite = [...state.favorite, payload];
    },
    deleteContactFavorite: (state, {payload}) => {
      state.favorite = state.favorite.filter(v => v !== payload);
    },
    addDataContactFavorite: (state, {payload}) => {
      state.dataFavorite = [...state.dataFavorite, payload];
    },
    deleteDataContactFavorite: (state, {payload}) => {
      state.dataFavorite = state.dataFavorite.filter(v => v.id !== payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStartPhoneBook,
  onFinishPhoneBook,
  onLogoutPhoneBook,
  getAllContactData,
  addContactFavorite,
  deleteContactFavorite,
  addDataContactFavorite,
  deleteDataContactFavorite,
} = phoneBookSlice.actions;

export const GetAllContactAction = token => (dispatch: any) => {
  axios
    .get(`${HOST}contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(getAllContactData(res.data.data));
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => {});
};

export const SaveContactAction = (user, token) => (dispatch: any) => {
  dispatch(onStartPhoneBook());
  axios
    .post(`${HOST}contacts`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      ShowToast(res.data.message);
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishPhoneBook()));
};

export const DeleteContactAction = (token, id) => (dispatch: any) => {
  dispatch(onStartPhoneBook());
  axios
    .delete(`${HOST}contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      ShowToast(res.data.message);
      dispatch(GetAllContactAction(token));
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishPhoneBook()));
};

export const UpdateContactAction = (user, token, id, navigation) => (
  dispatch: any,
) => {
  dispatch(onStartPhoneBook());
  axios
    .put(`${HOST}contacts/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      ShowToast(res.data.message);
      navigation.navigate(ROUTER.Bottom);
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishPhoneBook()));
};

export const UpdateProfileAction = (user, token) => (dispatch: any) => {
  dispatch(onStartPhoneBook());
  axios
    .put(`${HOST}users/profile`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      ShowToast(res.data.message);
      storeData('token', res.data.data);
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishPhoneBook()));
};

export const UpdateProfilePasswordAction = (user, token) => (dispatch: any) => {
  dispatch(onStartPhoneBook());
  axios
    .put(
      `${HOST}users/password`,
      {password: user},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      ShowToast(res.data.message);
    })
    .catch(err => {
      ShowToast(err.response.data.data);
    })
    .finally(() => dispatch(onFinishPhoneBook()));
};
