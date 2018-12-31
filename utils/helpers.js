import { Alert } from 'react-native';

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String} The shuffled array
 */
const shuffle = (array) => {
  const arrayCopy = [...array];
  let currentIndex = arrayCopy.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
};

// Define a maximum font size for text and normalize its value to have a good value based on
// containers size
const normalizeFontSize = (textLength, containerWidth, containerHeight) => {
  const fontSize = Math.sqrt(containerWidth * containerHeight / textLength);
  return fontSize > 30 ? 30 : fontSize;
};

// Create a custom alert
const createAlert = (params) => {
  const { title, message, onPress } = params;

  return Alert.alert(
    title,
    message,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress },
    ],
    { cancelable: false },
  );
};

export {
  shuffle,
  normalizeFontSize,
  createAlert,
};
