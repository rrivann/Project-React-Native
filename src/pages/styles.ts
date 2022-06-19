import {StyleSheet} from 'react-native';
import {colors} from '../utils';

export const styles = StyleSheet.create({
  pageSplash: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
