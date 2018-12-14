import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import Swipeout from 'react-native-swipeout';
import chroma from 'chroma-js';

import HiddenSetItem from './HiddenSetItem';

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

    const chromaBackground = chroma(backgroundColor);
    const darkenColor = chromaBackground.darken(0.9).hex();
    const darkenColorRgb = `rgb(${chroma(darkenColor).rgb().toString()})`;
    const rgbColor = `rgb(${chromaBackground.rgb().toString()})`;


    const containerStyles = {
      ...styles.container,
      backgroundColor,
    };

    const rippleProps = {
      rippleDuration: 800,
      rippleColor: darkenColorRgb,
      style: styles.ripple,
    };

    const caretBorder = {
      borderRightColor: darkenColor,
    };

    const swipeoutBtns = [{
      component: (
        <HiddenSetItem
          backgroundColor={darkenColor}
          color={rgbColor}
        />),
    }];

    return (
      <Swipeout
        backgroundColor={darkenColor}
        buttonWidth={75}
        right={swipeoutBtns}
        sensitivity={30}
        style={styles.swipeContainer}
      >
        <View style={containerStyles}>
          <Ripple {...rippleProps} onPress={() => onPressItem(title)}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.cardsQuantity}>{`${cardsQuantity} cards`}</Text>
            <Text style={styles.date}>{date}</Text>
          </Ripple>
          <View style={[styles.caret, caretBorder]}>
            <AntDesign color={darkenColor} name="caretleft" size={30} />
          </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  swipeContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 3,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ripple: {
    width: '95%',
    height: '100%',
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  caret: {
    width: '5%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRightWidth: 3,
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
