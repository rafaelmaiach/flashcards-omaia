import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { Entypo, Octicons } from '@expo/vector-icons';

import { $white, $lightRed, $green } from '../../utils/colors';

/**
 * @class QuizResultCardList
 * @description Create the cards for quiz result list
 */
class QuizResultCardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
  }

  render() {
    const { frontText, backText, isCorrect } = this.props;

    const themeColor = isCorrect ? $green : $lightRed;

    const bgColorTheme = { backgroundColor: themeColor };
    const borderColorTheme = { borderColor: themeColor };

    return (
      <View style={[styles.cardContainer, borderColorTheme]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{frontText}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{backText}</Text>
        </View>
        <View style={[styles.icon, bgColorTheme]}>
          {
            isCorrect
              ? <Entypo color={$white} name="check" size={20} />
              : <Octicons color={$white} name="x" size={25} />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '99%',
    minHeight: 50,
    borderRadius: 3,
    borderWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: $white,
    marginBottom: 15,
  },
  textContainer: {
    padding: 10,
    width: '42%',
  },
  icon: {
    width: '14%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizResultCardItem;
