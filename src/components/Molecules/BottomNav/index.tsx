import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  colors,
  HEIGHT,
  IconEntypo,
  IconFoundation,
  IconMaterialCommunityIcons,
  IconMaterialIcons,
  WIDTH,
} from '../../../utils';

const Icon = ({label, focus}: any): any => {
  switch (label) {
    case 'Phone Book':
      return focus ? (
        <IconMaterialCommunityIcons
          name="contacts-outline"
          color={colors.white}
          size={focus ? 26 : 20}
        />
      ) : (
        <IconMaterialCommunityIcons
          name="contacts-outline"
          size={focus ? 26 : 20}
          color={colors.textPrimary}
        />
      );
    case 'Favorite':
      return focus ? (
        <IconMaterialIcons
          name="favorite"
          size={focus ? 26 : 20}
          color={colors.white}
        />
      ) : (
        <IconMaterialIcons
          name="favorite"
          size={focus ? 26 : 20}
          color={colors.textPrimary}
        />
      );
    case 'Add Contact':
      return focus ? (
        <IconFoundation
          name="telephone"
          size={focus ? 30 : 22}
          color={colors.white}
        />
      ) : (
        <IconFoundation
          name="telephone"
          size={focus ? 30 : 22}
          color={colors.textPrimary}
        />
      );
    case 'Profile':
      return focus ? (
        <IconMaterialCommunityIcons
          name="account"
          size={focus ? 30 : 24}
          color={colors.white}
        />
      ) : (
        <IconMaterialCommunityIcons
          name="account"
          size={focus ? 30 : 24}
          color={colors.black}
        />
      );
    default:
      return <IconEntypo name="home" color={colors.white} size={20} />;
  }
};

const BottomNav: FC = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles().container}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}>
            <View style={styles().content}>
              <Icon label={label} focus={isFocused} />
              <Text style={styles(isFocused).text}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = (isFocused?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      elevation: 5,
      justifyContent: 'space-around',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      height: HEIGHT * 0.08,
      width: WIDTH * 0.18,
    },
    text: {
      marginTop: 2,
      color: isFocused ? colors.white : colors.textPrimary,
      fontSize: 12,
    },
  });

export default BottomNav;
