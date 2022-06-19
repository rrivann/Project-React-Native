import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import data from './data';
import {Transition, Transitioning} from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const index = () => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}>
      <StatusBar hidden />
      <View
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
        {data.map(({bg, color, category, subCategories}, index) => {
          return (
            <TouchableOpacity
              key={category}
              onPress={() => {
                ref.current.animateNextTransition();
                setCurrentIndex(index === currentIndex ? null : index);
              }}
              style={styles.cardContainer}
              activeOpacity={0.9}>
              <View style={[styles.card, {backgroundColor: bg}]}>
                <Text style={[styles.heading, {color}]}>{category}</Text>
                {index === currentIndex && (
                  <View style={styles.subCategoriesList}>
                    {subCategories.map((subCategory) => (
                      <Text key={subCategory} style={[styles.body, {color}]}>
                        {subCategory}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Transitioning.View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
    backgroundColor: 'yellow',
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
