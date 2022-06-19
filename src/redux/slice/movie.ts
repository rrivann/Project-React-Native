import {createSlice} from '@reduxjs/toolkit';
import {HOST} from '../../config';

interface MovieState {
  loading: boolean;
  data: any;
  dataDetail: any;
  dataTicket: any;
  showTime: any;
}

const initialState = {
  loading: false,
  data: [],
  dataDetail: [],
  dataTicket: [],
  showTime: '',
} as MovieState;

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    onStart: state => {
      state.loading = true;
    },
    onFinish: state => {
      state.loading = false;
    },
    onReset: () => {
      return initialState;
    },
    addDataMovie: (s, {payload}) => {
      s.data = payload;
    },
    addDataMovieDetail: (s, {payload}) => {
      s.dataDetail = payload;
    },
    addDataTicketDetail: (s, {payload}) => {
      s.dataTicket = payload;
    },
    addShowTime: (s, {payload}) => {
      s.showTime = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStart,
  onFinish,
  onReset,
  addDataMovie,
  addDataMovieDetail,
  addDataTicketDetail,
  addShowTime,
} = movieSlice.actions;

export const GetMovieAction = () => (dispatch: any) => {
  dispatch(onStart());
  fetch(`${HOST}movie`)
    .then(res => res.json())
    .then(json => dispatch(addDataMovie(json.data)))
    .catch(err => console.log('err', err.response))
    .finally(() => dispatch(onFinish()));
};

export const GetMovieDetailAction = (id: any) => (dispatch: any) => {
  dispatch(onStart());
  fetch(`${HOST}movie/view?id=${id}`)
    .then(res => res.json())
    .then(json => dispatch(addDataMovieDetail(json.data)))
    .catch(err => console.log('err', err.response))
    .finally(() => dispatch(onFinish()));
};

export const PostMovieTicketAction = (movieId: any, timeId: any) => (
  dispatch: any,
) => {
  let data = new FormData();
  data.append('movieId', movieId);
  data.append('timeId', timeId);

  dispatch(onStart());
  fetch('https://test.vkp.co.id/movie-api/ticket/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  })
    .then(res => res.json())
    .then(json => {
      dispatch(addDataTicketDetail(json.data));
    })
    .catch(err => {
      console.log('err post', err);
    })
    .finally(() => dispatch(onFinish()));
};
