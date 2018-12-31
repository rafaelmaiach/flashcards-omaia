import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';

import QuizResultCardItem from './QuizResultCardItem';

/**
 * @class QuizResultCardList
 * @description Create the cards for quiz result list
 */
class QuizResultCardList extends PureComponent {
  static propTypes = {
    quizResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <QuizResultCardItem {...item} />;

  render() {
    const { quizResult } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={quizResult}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
});

export default QuizResultCardList;
