import { Animated } from 'react-native';

const cardShowAnimation = (scale, opacity) => (
  Animated.parallel([
    Animated.timing(
      scale,
      {
        toValue: 1,
        duration: 400,
      },
    ),
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 400,
      },
    ),
  ])
);

const cardFlipToFront = flipValue => (
  Animated.spring(
    flipValue,
    {
      toValue: 0,
      friction: 8,
      tension: 10,
    },
  )
);

const cardFlipToBack = flipValue => (
  Animated.spring(
    flipValue,
    {
      toValue: 180,
      friction: 8,
      tension: 10,
    },
  )
);

export {
  cardShowAnimation,
  cardFlipToFront,
  cardFlipToBack,
};
