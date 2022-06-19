import firestore from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';

interface AbsenState {
  loading: boolean;
  successAbsen: boolean;
  dataAbsen: any;
  doneAbsenIn: boolean;
  dataAbsenTemp: any;
}

const initialState = {
  loading: false,
  successAbsen: false,
  doneAbsenIn: false,
  dataAbsen: [],
  dataAbsenTemp: '',
} as AbsenState;

export const absenSlice = createSlice({
  name: 'absen',
  initialState,
  reducers: {
    onStart: state => {
      state.loading = true;
    },
    onFinish: state => {
      state.loading = false;
    },
    changeAbsenIn: (state, {payload}) => {
      state.successAbsen = payload;
    },
    actionDoneAbsenIn: (state, {payload}) => {
      state.doneAbsenIn = payload;
    },
    addDataAbsen: (state, {payload}) => {
      state.dataAbsen = payload;
    },
    addDataAbsenTemp: (state, {payload}) => {
      state.dataAbsenTemp = payload;
    },
    onLogout: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStart,
  onFinish,
  changeAbsenIn,
  addDataAbsen,
  actionDoneAbsenIn,
  addDataAbsenTemp,
  onLogout,
} = absenSlice.actions;

const absenCollection = firestore().collection('absen');

export const addAbsenIn = (absen: any) => (dispatch: any) => {
  dispatch(onStart());
  absenCollection
    .doc(absen.idSet)
    .set({
      userID: absen.uid,
      nama: absen.nama,
      tanggal: absen.tanggal,
      absenIn: absen.absenIn,
      absenOut: '',
      lamaKerja: '',
    })
    .then(() => {
      dispatch(addDataAbsenTemp(absen));
      dispatch(changeAbsenIn(true));
      dispatch(actionDoneAbsenIn(true));
    })
    .catch(err => {
      console.log('errtic', err);
    })
    .finally(() => {
      dispatch(onFinish());
    });
};

export const addAbsenOut = (absen: any) => (dispatch: any) => {
  dispatch(onStart());
  absenCollection
    .doc(absen.uid)
    .update({
      absenOut: absen.absenOut,
      lamaKerja: absen.lamaKerja,
    })
    .then(() => {
      dispatch(addDataAbsenTemp(''));
      dispatch(changeAbsenIn(true));
      dispatch(actionDoneAbsenIn(false));
    })
    .catch(err => {
      console.log('errtic', err);
    })
    .finally(() => {
      dispatch(onFinish());
    });
};

export const getDataAbsen = (uid: any) => async (dispatch: any) => {
  const snapshot = await absenCollection.get();

  const documents = snapshot.docs.filter(
    document => document?._data?.userID === uid,
  );

  dispatch(addDataAbsen(documents.map(data => data?._data)));
};
