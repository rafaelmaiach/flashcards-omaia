import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet,
} from 'react-native';

import {
  $darkBlue, $green, $lightRed,
} from '../../utils/colors';

class QuizResult extends PureComponent {
  static propTypes = {
    quizResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { quizResult } = this.props;

    const quizTotal = quizResult.length;
    const quizCorrect = quizResult.filter(card => card.isCorrect).length;
    const quizIncorrect = quizResult.filter(card => !card.isCorrect).length;

    return (
      <View style={styles.container}>
        <View style={styles.cardsTitleContainer}>
          <View style={[styles.resultBox, styles.titleTotal]}>
            <Text style={[styles.resultText, styles.titleTotalText]}>
              STUDIED
            </Text>
            <Text style={[styles.resultText, styles.titleTotalText]}>
              {quizTotal}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.titleCorrect]}>
            <Text style={[styles.resultText, styles.titleCorrectText]}>
              CORRECT
            </Text>
            <Text style={[styles.resultText, styles.titleCorrectText]}>
              {quizCorrect}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.titleIncorrect]}>
            <Text style={[styles.resultText, styles.titleIncorrectText]}>
              INCORRECT
            </Text>
            <Text style={[styles.resultText, styles.titleIncorrectText]}>
              {quizIncorrect}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 25,
  },
  resultBox: {
    borderWidth: 3,
    borderRadius: 3,
    width: '30%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleTotal: {
    borderColor: $darkBlue,
    backgroundColor: `${$darkBlue}0D`,
  },
  titleTotalText: {
    color: $darkBlue,
  },
  titleCorrect: {
    borderColor: $green,
    backgroundColor: `${$green}0D`,
  },
  titleCorrectText: {
    color: $green,
  },
  titleIncorrect: {
    borderColor: $lightRed,
    backgroundColor: `${$lightRed}0D`,
  },
  titleIncorrectText: {
    color: $lightRed,
  },
});

const mapStateToProps = ({ quiz }) => ({
  quizResult: Object.values(quiz),
});

export default connect(mapStateToProps)(QuizResult);
