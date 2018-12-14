import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';

import { $black, $lightBlack } from '../../utils/colors';
import { timeConverter } from '../../utils/helpers';

class SetItem extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.number).isRequired,
    createdDate: PropTypes.number.isRequired,
    onPressItem: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const {
      title,
      createdDate,
      backgroundColor,
      cards,
      onPressItem,
    } = this.props;

    const date = timeConverter(createdDate);
    const cardsQuantity = cards.length;

    const containerStyles = {
      ...styles.container,
      backgroundColor,
    };

    const rippleProps = {
      style: containerStyles,
    };

    return (
      <Ripple {...rippleProps} onPress={() => onPressItem(title)}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cardsQuantity}>{`${cardsQuantity} cards`}</Text>
        <Text style={styles.date}>{date}</Text>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 25,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 3,
  },
  title: {
    fontSize: 22,
    paddingBottom: 5,
    fontWeight: '600',
    color: $black,
  },
  cardsQuantity: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: '500',
    color: $lightBlack,
  },
  date: {
    fontSize: 12,
    color: $lightBlack,
  },
});

export default SetItem;
