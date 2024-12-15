import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  clamp,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {OnboardingData} from '../data/data';

type Props = {
  x: SharedValue<number>;
  screenWidth: number;
  data: OnboardingData[];
  currentIndex: number;
};

const RADIUS = 100;

const Button = ({x, screenWidth, data, currentIndex}: Props) => {

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const animatedOpacityButton = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(x.value % screenWidth),
      [0, 40],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <AnimatedPressable
      style={[styles.button, animatedOpacityButton]}
      onPress={() => {
        if (Math.abs(x.value) % screenWidth === 0) {
          const clampValue = clamp(
            Math.abs(x.value) + screenWidth,
            0,
            2 * screenWidth,
          );
          x.value = withTiming(-clampValue, {duration: 1000});
          if (currentIndex === 2) {
            // navigation.goBack();
          }
        }
      }}>
 
    </AnimatedPressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    zIndex: 9999999,
    position: 'absolute',
    width: RADIUS,
    height: RADIUS,
    borderRadius: RADIUS,
    bottom: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
