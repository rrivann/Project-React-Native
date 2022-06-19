import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {authSlice, phoneBookSlice} from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {ROUTER} from '../router/constant';

const reducer = combineReducers({
  auth: authSlice.reducer,
  phoneBook: phoneBookSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [ROUTER.Favorite, ROUTER.Home],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
