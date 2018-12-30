import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import chroma from 'chroma-js';

import { updateCardAnswer } from '../../../actions/quiz';

import { $white, $green, $lightRed } from '../../../utils/colors';

class CardItemFooter extends PureComponent {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    bgColor: PropTypes.string.isRequired,
    carouselRef: PropTypes.object.isRequired,
    flipCard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    quizLength: PropTypes.number.isRequired,
    setActiveIndex: PropTypes.func.isRequired,
    setQuizFinished: PropTypes.func.isRequired,
    side: PropTypes.string.isRequired,
    updateAnswer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { id } = props;

    this.updateAnswerIncorrect = () => this.saveAnswer(id, false);
    this.updateAnswerCorrect = () => this.saveAnswer(id, true);
  }

  saveAnswer = (id, answer) => {
    const { updateAnswer } = this.props;

    this.goToNextItem();

    updateAnswer(id, answer);
  }

  goToNextItem = () => {
    const {
      carouselRef,
      activeIndex,
      setActiveIndex,
      quizLength,
      setQuizFinished,
    } = this.props;

    if (activeIndex + 1 < quizLength) {
      setActiveIndex(activeIndex + 1);
      carouselRef.snapToNext();
      return;
    }

    setQuizFinished();
  }

  render() {
    const {
      side,
      bgColor,
      flipCard,
    } = this.props;

    const footerStyles = {
      ...styles.footerContainer,
      backgroundColor: chroma(bgColor).darken(1).hex(),
    };

    const flipIcon = side === 'front' ? 'flip-to-back' : 'flip-to-front';

    return (
      <View style={footerStyles}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={this.updateAnswerIncorrect}
          style={styles.button}
        >
          <Octicons color={$lightRed} name="x" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={flipCard}
          style={styles.button}
        >
          <MaterialIcons color={$white} name={flipIcon} size={30} />
          <Text style={styles.buttonText}>Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={this.updateAnswerCorrect}
          style={styles.button}
        >
          <Entypo color={$green} name="check" size={35} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '100%',
  },
  buttonText: {
    color: $white,
    paddingTop: 3,
  },
});

const mapDispatchToProps = dispatch => ({
  updateAnswer: (cardId, answer) => dispatch(updateCardAnswer(cardId, answer)),
});

export default connect(null, mapDispatchToProps)(CardItemFooter);
