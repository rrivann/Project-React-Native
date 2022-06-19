import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const index = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.page}>
      <Text style={{textAlign: 'center', marginHorizontal: 20}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    marginTop: 50,
    width: 300,
    height: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 50,
  },
});
