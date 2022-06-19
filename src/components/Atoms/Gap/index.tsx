import React, {FC} from 'react';
import {View} from 'react-native';

interface GapScreenProps {
  width?: number;
  height?: number;
}

const Gap: FC<GapScreenProps> = ({width, height}) => {
  return <View style={{width: width, height: height}} />;
};

export default Gap;
