import React, {createRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  TextInput,
} from 'react-native';
import {cakeGif} from '../../Assets/Anim1';

const {width} = Dimensions.get('screen');

const minAge = 14;
const segmentsLength = 91;
const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 100;
const data = [...Array(segmentsLength).keys()].map((i) => i + minAge);
// console.log('data: ', data);

const Ruler = () => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {data.map((i) => {
        const tenth = i % 10 === 0;
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: tenth ? '#333' : '#999',
                height: tenth ? 40 : 20,
                marginRight: i === data.length - 1 ? 0 : segmentSpacing,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const index = () => {
  const scrollViewRef = createRef();
  const textInputRef = createRef();
  const [constructor] = useState({
    scrollX: new Animated.Value(0),
    initialAge: 25,
  });
  constructor.scrollX.addListener(({value}) => {
    if (textInputRef && textInputRef.current) {
      textInputRef.current.setNativeProps({
        text: `${Math.round(value / snapSegment) + minAge}`,
      });
    }
  });

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (constructor.initialAge - minAge) * snapSegment,
          y: 0,
          Animated: true,
        });
      }
    }, 1000);
  });
  return (
    <View style={styles.page}>
      <Image source={cakeGif} style={styles.cake} />
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={{
          justifyContent: 'flex-end',
        }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={snapSegment}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: constructor.scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        <Ruler />
      </Animated.ScrollView>
      <View style={styles.indicatorWrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.ageValue}
          defaultValue={minAge.toString()}
        />
        <View style={[styles.segment, styles.segmentIndicator]} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  cake: {
    width,
    height: width * 1.2,
    resizeMode: 'cover',
  },
  ruler: {
    width: rulerWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  segment: {
    width: segmentWidth,
  },
  ageValue: {
    fontSize: 42,
    fontFamily: 'Menlo',
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (width - indicatorWidth) / 2,
    bottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth,
  },
  segmentIndicator: {
    height: indicatorHeight,
    backgroundColor: 'turquoise',
  },
  spacer: {
    width: spacerWidth,
  },
});
