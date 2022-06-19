/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KongPic, TenetPic, TheHolyPic} from '../../assets';
import {Button, Divider, Gap, Text} from '../../components';
import {
  GetMovieAction,
  GetMovieDetailAction,
  useAppSelector,
} from '../../redux';
import {ROUTER} from '../../router/constant';
import {colors, IconMaterialCommunityIcons} from '../../utils';

const HomeItem = memo(
  ({title, image, description, category, duration, onPress}: any) => {
    const [showMore, setShowMore] = useState(false);

    const timeConvert = (n: number) => {
      let num = n;
      let hours = num / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      return rhours + 'h ' + rminutes + 'm';
    };
    const imageSwitch = (id: number) => {
      switch (id) {
        case 1:
          return KongPic;
        case 2:
          return TheHolyPic;
        case 3:
          return TenetPic;
      }
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          marginHorizontal: 15,
          paddingHorizontal: 11,
          paddingVertical: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 150,
              width: 100,
              borderRadius: 10,
              alignSelf: 'flex-start',
            }}
            source={imageSwitch(image)}
            resizeMethod="auto"
          />
          <Gap width={10} />
          <View>
            <Text h3 bold>
              {title}
            </Text>
            <Text style={{maxWidth: '80%'}} numberOfLines={showMore ? 50 : 5}>
              {description}
            </Text>
            <Text onPress={() => setShowMore(!showMore)} bold>
              {showMore ? 'Show Less' : 'Show More'}
            </Text>
          </View>
        </View>
        <Gap height={12} />
        <Divider />
        <Gap height={6.5} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconMaterialCommunityIcons
              name="account"
              color={colors.primary}
              size={28}
            />
            <Gap width={5} />
            <Text style={{marginTop: 4}}>{category}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconMaterialCommunityIcons
              name="clock-time-five"
              color={colors.primary}
              size={28}
            />
            <Gap width={5} />
            <Text style={{marginTop: 4}}>{timeConvert(duration)}</Text>
          </View>
          <Button
            title="BOOK TICKET"
            style={{width: '36%'}}
            onPress={onPress}
            activeOpacity={0.6}
          />
        </View>
      </View>
    );
  },
);

const Home: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {movie} = useAppSelector(s => s);

  useEffect(() => {
    if (movie.data.length === 0) {
      dispatch(GetMovieAction());
    }
  }, [dispatch, movie.data]);

  const onRefresh = () => {
    dispatch(GetMovieAction());
  };

  const onSubmit = (id: any) => {
    dispatch(GetMovieDetailAction(id));
    navigation.navigate(ROUTER.detailMovie, id);
  };

  return (
    <View style={{backgroundColor: '#F2F2F2'}}>
      <StatusBar backgroundColor={colors.primary} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={movie.loading} onRefresh={onRefresh} />
        }>
        <Gap height={11} />
        <Text style={{marginHorizontal: 20, marginBottom: 19}} h2>
          Trending Today
        </Text>
        {movie.loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          movie.data.map((item: any) => {
            return (
              <HomeItem
                key={item.movieId}
                title={item.title}
                image={item.movieId}
                description={item.description}
                category={item.category}
                duration={item.duration}
                onPress={() => onSubmit(item.movieId)}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
