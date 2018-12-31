import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { resetQuiz } from '../../actions/quiz';

import CardsList from '../../components/QuizView/QuizCards/QuizList';
import QuizResult from '../../components/QuizView/QuizResult';
import commonNavigationOptions from '../commonNavigationOptions';

class QuizView extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    resetQuizView: PropTypes.func.isRequired,
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
    const { resetQuizView } = this.props;

    resetQuizView();
  }

  setQuizFinished = () => this.setState(() => ({ quizFinished: true }));

  render() {
    const { quizFinished } = this.state;
    const { set: { cards }, navigation } = this.props;

    return (
      <View style={styles.container}>
        {quizFinished
          ? <QuizResult navigation={navigation} />
          : (
            <View style={styles.carouselContainer}>
              <CardsList cards={cards} setQuizFinished={this.setQuizFinished} />
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

const mapStateToProps = ({ sets, cards, selectedSet }) => {
  const currentSet = sets.byId[selectedSet.id];

  const set = {
    ...currentSet,
    cards: currentSet.cards.map(cardId => cards[cardId]),
  };

  return {
    set,
  };
};

const mapDispatchToProps = dispatch => ({
  resetQuizView: () => dispatch(resetQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
