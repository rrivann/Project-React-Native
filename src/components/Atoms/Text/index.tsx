import React, {FC} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {colors, Fonts} from '../../../utils';

type TextProps = {
  onPress?: any;
  h1?: any;
  h2?: any;
  h3?: any;
  h4?: any;
  h5?: any;
  h6?: any;
  normal?: any;
  caption?: any;
  small?: any;
  regular?: any;
  opregular?: any;
  opsemibold?: any;
  light?: any;
  semibold?: any;
  extrabold?: any;
  bold?: any;
  italic?: any;
  center?: any;
  left?: any;
  right?: any;
  baseTextColor?: any;
  solid?: any;
  primaryColor?: any;
  greyColor?: any;
  whiteColor?: any;
  dangerColor?: any;
  numberOfLines?: number;
  fontSize?: any;
  style?: any;
  children?: any;
  capitalize?: any;
  textColor?: any;
  marginLeft?: any;
  marginTop?: any;
  marginRight?: any;
  marginBottom?: any;
};

const Text: FC<TextProps> = ({
  onPress,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  normal,
  caption,
  small,
  regular,
  light,
  semibold,
  extrabold,
  bold,
  italic,
  center,
  left,
  right,
  baseTextColor,
  solid,
  primaryColor,
  greyColor,
  whiteColor,
  dangerColor,
  numberOfLines,
  fontSize,
  style,
  children,
  capitalize,
  textColor,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
}) => {
  return (
    <RNText
      onPress={onPress}
      style={StyleSheet.flatten([
        defaultStyle,
        fontSize && StyleSheet.flatten({fontSize}),
        h1 && StyleSheet.flatten({fontSize: Font.size.h1}),
        h2 && StyleSheet.flatten({fontSize: Font.size.h2}),
        h3 && StyleSheet.flatten({fontSize: Font.size.h3}),
        h4 && StyleSheet.flatten({fontSize: Font.size.h4}),
        h5 && StyleSheet.flatten({fontSize: Font.size.h5}),
        h6 && StyleSheet.flatten({fontSize: Font.size.h6}),
        small && StyleSheet.flatten({fontSize: Font.size.small}),
        normal && StyleSheet.flatten({fontSize: Font.size.normal}),
        caption && StyleSheet.flatten({fontSize: Font.size.caption}),
        //custom for font
        regular && StyleSheet.flatten({fontFamily: Font.type.regular}),
        light && StyleSheet.flatten({fontFamily: Font.type.light}),
        semibold && StyleSheet.flatten({fontFamily: Font.type.semibold}),
        bold && StyleSheet.flatten({fontFamily: Font.type.bold}),
        italic && StyleSheet.flatten({fontStyle: Font.type.italic}),
        extrabold && StyleSheet.flatten({fontFamily: Font.type.extrabold}),
        //custom for align
        center && StyleSheet.flatten({textAlign: 'center'}),
        left && StyleSheet.flatten({textAlign: 'left'}),
        right && StyleSheet.flatten({textAlign: 'right'}),
        //custom for color
        baseTextColor && StyleSheet.flatten({color: colors.textPrimary}),
        solid && StyleSheet.flatten({color: colors.textSecondary}),
        primaryColor && StyleSheet.flatten({color: colors.primary}),
        greyColor && StyleSheet.flatten({color: colors.grey}),
        whiteColor && StyleSheet.flatten({color: colors.white}),
        dangerColor && StyleSheet.flatten({color: colors.red}),
        capitalize && StyleSheet.flatten({textTransform: 'capitalize'}),
        textColor && StyleSheet.flatten({color: textColor}),
        marginLeft && StyleSheet.flatten({marginLeft: marginLeft}),
        marginTop && StyleSheet.flatten({marginTop: marginTop}),
        marginRight && StyleSheet.flatten({marginRight: marginRight}),
        marginBottom && StyleSheet.flatten({marginBottom: marginBottom}),
        style && style,
      ])}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

export default Text;

const Font = {
  size: {
    h1: 30,
    h2: 24,
    h3: 22,
    h4: 20,
    h5: 18,
    h6: 16,
    normal: 14,
    caption: 12,
    small: 10,
  },
  type: {
    italic: 'italic',
    light: Fonts.light,
    regular: Fonts.regular,
    semibold: Fonts.semiBold,
    bold: Fonts.bold,
    extrabold: '',
  },
};

const defaultStyle = {
  color: colors.textPrimary,
  textAlign: 'left',
  fontFamily: Font.type.regular,
};
