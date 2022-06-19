import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';

const setSta = () => dispatch => {
  Axios.request({url: 'some.url'}).then(res => {
    dispatch({type: 'setStatus', payload: res.data.status});
  });
};

const MyScreen = () => {
  const sta = useSelector(s => s.status);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSta());
    }, 2000);
  }, [dispatch]);

  return (
    <View>
      <Text testID="text">{sta}</Text>
    </View>
  );
};

export default MyScreen;
