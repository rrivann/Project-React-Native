/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Text from '../Text';
import Gap from '../Gap';
import {colors} from '../../../utils';

type ButtonProps = {
  title?: any;
  onPress?: any;
  isDisabled?: any;
  isLoading?: any;
  smallFont?: boolean;
  bgColor?: string;
  secondary?: boolean;
  border?: boolean;
  borderColor?: any;
  fontSize?: number;
  style?: any;
  icon?: any;
  activeOpacity?: any;
};

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  isDisabled,
  isLoading,
  smallFont = false,
  bgColor = colors.primary,
  secondary = false,
  border = false,
  borderColor,
  fontSize = 16,
  style,
  icon,
  activeOpacity,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={isLoading ? null : onPress}
      disabled={isLoading ? true : isDisabled}
      style={[
        styles.button,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: isDisabled ? colors.disabledButton : bgColor,
          borderWidth: border ? 1 : 0,
          borderColor: borderColor ? borderColor : colors.border,
        },
      ]}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <View style={styles.content}>
          {icon}
          {icon ? <Gap width={12} /> : null}
          <Text
            style={{marginTop: 4}}
            caption={smallFont}
            fontSize={fontSize}
            whiteColor={!secondary}
            baseTextColor={secondary}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 5,
    elevation: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
