import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { $darkBlue } from '../../../utils/colors';

/**
 * @function QuizPagination
 * @description Create the pagination component for quiz
 */
const QuizPagination = ({ activeIndex, length }) => (
  <View style={styles.container}>
    <Text style={styles.pages}>{`${activeIndex + 1}/${length}`}</Text>
  </View>
);

QuizPagination.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pages: {
    color: $darkBlue,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizPagination;
