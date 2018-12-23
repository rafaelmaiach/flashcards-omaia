import { Animated } from 'react-native';

const openNewSetAnimation = (params) => {
  const { hiddenIconsContainerSize, buttonContainerOpacity, windowHeight } = params;

  return Animated.sequence([
    Animated.timing(
      hiddenIconsContainerSize,
      {
        toValue: windowHeight,
        duration: 100,
      },
    ),
    Animated.timing(
      buttonContainerOpacity,
      {
        toValue: 1,
        duration: 350,
      },
    ),
  ]);
};

const closeNewSetAnimation = (params) => {
  const { buttonContainerOpacity, hiddenIconsContainerSize } = params;

  return Animated.sequence([
    Animated.timing(
      buttonContainerOpacity,
      {
        toValue: 0,
        duration: 350,
      },
    ),
    Animated.timing(
      hiddenIconsContainerSize,
      {
        toValue: 0,
        duration: 100,
      },
    ),
  ]);
};

export {
  openNewSetAnimation,
  closeNewSetAnimation,
};
