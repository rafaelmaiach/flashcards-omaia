import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import QuizResultCardList from './QuizResultCardList';

import {
  $darkBlue, $green, $lightRed,
} from '../../utils/colors';

class QuizResult extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    quizResult: PropTypes.arrayOf(PropTypes.object).isRequired,
    startQuiz: PropTypes.func.isRequired,
  }

  startNewQuiz = () => {
    const { startQuiz } = this.props;
    startQuiz();
  }

  goToSetView = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { quizResult } = this.props;

    const quizTotal = quizResult.length;
    const quizCorrect = quizResult.filter(card => card.isCorrect).length;
    const quizIncorrect = quizResult.filter(card => !card.isCorrect).length;

    return (
      <View style={styles.container}>
        <View style={styles.resultCardsBox}>
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.startNewQuiz}
            style={[styles.button, styles.titleTotal]}
          >
            <Text style={[styles.buttonText, styles.titleTotalText]}>
              NEW QUIZ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.goToSetView}
            style={[styles.button, styles.titleTotal]}
          >
            <Text style={[styles.buttonText, styles.titleTotalText]}>
              GO BACK
            </Text>
          </TouchableOpacity>
        </View>
        <QuizResultCardList quizResult={quizResult} />
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
  resultCardsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
  },
  resultBox: {
    borderWidth: 3,
    borderRadius: 3,
    width: '30%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
  },
  button: {
    borderWidth: 3,
    borderRadius: 3,
    width: '45%',
    minHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 14,
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
