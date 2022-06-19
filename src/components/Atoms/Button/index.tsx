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
  fontSize?: number;
  style?: any;
  icon?: any;
  width?: any;
  height?: any;
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
  fontSize = 16,
  style,
  icon,
  width,
  height,
}) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? null : onPress}
      disabled={isLoading ? true : isDisabled}
      style={[
        styles.button(width, height),
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: isDisabled ? colors.disabledButton : bgColor,
          borderWidth: border ? 1 : 0,
          borderColor: colors.border,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <View style={styles.content}>
          {icon}
          {icon ? <Gap width={12} /> : null}
          <Text
            caption={smallFont}
            fontSize={fontSize}
            whiteColor={!secondary}
            baseTextColor={secondary}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: (width: any, height: any) => ({
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 12,
  }),
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
