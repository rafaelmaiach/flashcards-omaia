import { Animated } from 'react-native';

const cardShowAnimation = opacity => (
  Animated.timing(
    opacity,
    {
      toValue: 1,
      duration: 600,
    },
  )
);

export default cardShowAnimation;
