import { Animated } from 'react-native';

const cardShowAnimation = (scale, opacity) => (
  Animated.parallel([
    Animated.timing(
      scale,
      {
        toValue: 1,
        duration: 300,
      },
    ),
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 300,
      },
    ),
  ])
);

export default cardShowAnimation;
