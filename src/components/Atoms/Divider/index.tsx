import React, {FC} from 'react';
import {View} from 'react-native';
import {colors} from '../../../utils';

type DividerProps = {
  vertical?: boolean;
  height?: number;
  width?: number;
  margin?: number;
};

// Default divider is horizontal

const Divider: FC<DividerProps> = ({
  vertical = false,
  height = 1,
  width = 1,
  margin = 10,
}) => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: vertical ? '100%' : height,
        width: vertical ? width : '100%',
        backgroundColor: colors.border,
        marginVertical: vertical ? 0 : margin,
        marginHorizontal: vertical ? margin : 0,
      }}
    />
  );
};

export default Divider;
