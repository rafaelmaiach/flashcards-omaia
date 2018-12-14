import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';

import { $black, $lightBlack } from '../../utils/colors';
import { timeConverter } from '../../utils/helpers';

class SetItem extends PureComponent {
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
      <Ripple {...rippleProps}>
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
    padding: 20,
    borderRadius: 5,
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
