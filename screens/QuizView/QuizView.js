import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { createQuizCards } from '../../actions/quiz';

import CardsList from '../../components/QuizView/Cards/CardsList';
import QuizResult from '../../components/QuizView/QuizResult';
import commonNavigationOptions from '../commonNavigationOptions';

class QuizView extends PureComponent {
  static propTypes = {
    createQuiz: PropTypes.func.isRequired,
    set: PropTypes.object.isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const set = navigation.getParam('set');

    return ({
      ...commonNavigationOptions,
      title: `QUIZ (${set.title})`,
      headerStyle: {
        ...commonNavigationOptions.headerStyle,
        backgroundColor: set.backgroundColor,
      },
    });
  }

  state = {
    quizFinished: false,
  }

  componentDidMount() {
    const { set, createQuiz } = this.props;

    createQuiz(set.cards);
  }

  setQuizFinished = () => this.setState(() => ({ quizFinished: true }));

  render() {
    const { quizFinished } = this.state;

    return (
      <View style={styles.container}>
        {quizFinished
          ? <QuizResult />
          : (
            <View style={styles.carouselContainer}>
              <CardsList setQuizFinished={this.setQuizFinished} />
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  carouselContainer: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
});

const mapStateToProps = (state) => {
  const {
    sets, cards, selectedSet, quiz,
  } = state;

  const currentSet = sets.byId[selectedSet.id];

  const set = {
    ...currentSet,
    cards: currentSet.cards.map(cardId => cards[cardId]),
  };

  return {
    set,
    quiz,
  };
};

const mapDispatchToProps = dispatch => ({
  createQuiz: cards => dispatch(createQuizCards(cards)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
