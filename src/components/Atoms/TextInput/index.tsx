import React, {FC} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import {colors, IconFontAwesome5, WithDot} from '../../../utils';
import Gap from '../Gap';
import Text from '../Text';

export const INPUT_ICON_OPTIONS = {
  search: 'search',
};

/*
  keyboardType Option same as
  RN Keyboard type option
*/

type TextInputProps = {
  label?: any;
  leftIcon?: any;
  prefixText?: any;
  rightIcon?: any;
  placeholder?: any;
  secure?: boolean;
  toggleSecure?: any;
  isSecured?: boolean;
  value?: any;
  onChangeText?: any;
  border?: boolean;
  keyboardType?: any;
  editable?: boolean;
  containerStyle?: any;
  style?: any;
  dotted?: any;
  autoFocus?: any;
};

const TextInput: FC<TextInputProps> = props => {
  const renderIcon = (icon: any) => {
    switch (icon) {
      case INPUT_ICON_OPTIONS.search:
        return <IconFontAwesome5 name="search" size={20} color="#B6B6B6" />;
      default:
        return <View />;
    }
  };

  const {
    label,
    leftIcon,
    prefixText,
    rightIcon,
    placeholder,
    secure = false,
    toggleSecure = () => {},
    isSecured = false,
    value,
    onChangeText,
    border = true,
    keyboardType = 'default',
    editable = true,
    containerStyle = {},
    style,
    dotted,
    autoFocus,
  } = props;

  return (
    <View style={containerStyle}>
      {label && (
        <>
          <Text h6>{label}</Text>
          <Gap height={8} />
        </>
      )}
      <View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: border ? 1 : 0,
            borderRadius: 8,
            borderColor: colors.inputBorder,
          },
          style,
        ]}>
        {leftIcon && <View style={styles.icon}>{renderIcon(leftIcon)}</View>}
        {prefixText && (
          <View style={styles.icon}>
            <Text>{prefixText}</Text>
          </View>
        )}
        <RNTextInput
          keyboardType={keyboardType}
          secureTextEntry={isSecured}
          placeholder={placeholder}
          style={styles.textInput}
          onChangeText={text =>
            dotted ? onChangeText(text.replace(/\./g, '')) : onChangeText(text)
          }
          value={dotted ? WithDot(value) : value}
          editable={editable}
          underlineColorAndroid="transparent"
          autoFocus={autoFocus}
        />
        {secure && (
          <IconFontAwesome5
            onPress={toggleSecure}
            size={20}
            style={styles.icon}
            color="#cccccc"
            name={isSecured ? 'eye-slash' : 'eye'}
          />
        )}
        {rightIcon && <View>{rightIcon}</View>}
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 10,
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    minHeight: 40,
    borderBottomWidth: 0,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
});
