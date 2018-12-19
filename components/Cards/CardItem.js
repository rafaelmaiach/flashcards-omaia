import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { $lightBlue } from '../../utils/colors';

class CardItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  render() {
    const { id } = this.props;
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: $lightBlue,
    width: '100%',
    height: '70%',
    marginTop: '30%',
    borderRadius: 3,
    padding: 10,
  },
});

export default CardItem;
