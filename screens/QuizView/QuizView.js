import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import CardsList from '../../components/QuizView/Cards/CardsList';
import commonNavigationOptions from '../commonNavigationOptions';

class QuizView extends PureComponent {
  static propTypes = {
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

  render() {
    const { set: { cards } } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <CardsList cards={cards} />
        </View>
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

export default connect(mapStateToProps)(QuizView);
