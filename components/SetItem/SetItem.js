import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import Swipeout from 'react-native-swipeout';
import chroma from 'chroma-js';

import HiddenSetItem from './HiddenSetItem';

import { $white } from '../../utils/colors';

class SetItem extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    active: false,
  }

  createSwipeoutButtons = (darkenColor, rgbColor) => {
    const {
      id,
      title,
      backgroundColor,
      isDeleted,
      cards,
    } = this.props;

    const setInfo = {
      id,
      title,
      backgroundColor,
      cards,
    };

    const swipeoutBtnsDefault = [{
      component: (
        <HiddenSetItem
          backgroundColor={darkenColor}
          closeSwipeout={this.closeSwipeout}
          color={rgbColor}
          id={id}
          isDeleted={isDeleted}
        />),
    }];

    const swipeoutBtns = isDeleted
      ? [...swipeoutBtnsDefault]
      : [{
        component: (
          <HiddenSetItem
            backgroundColor={darkenColor}
            closeSwipeout={this.closeSwipeout}
            color={rgbColor}
            id={id}
            isEdit
            setInfo={setInfo}
          />),
      }, ...swipeoutBtnsDefault];

    return swipeoutBtns;
  }

  setupSwipeout = () => this.setState(() => ({ active: true }));

  closeSwipeout = () => this.setState(() => ({ active: false }));

  onPressItem = () => {
    const {
      id, title, backgroundColor, navigation,
    } = this.props;

    navigation.navigate('CardView', {
      id,
      title,
      backgroundColor,
    });
  }

  render() {
    const { active } = this.state;
    const {
      title,
      backgroundColor,
      cards,
    } = this.props;

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

    const swipeoutBtns = this.createSwipeoutButtons(darkenColor, rgbColor);

    return (
      <Swipeout
        autoClose
        backgroundColor={darkenColor}
        buttonWidth={75}
        close={!active}
        onOpen={this.setupSwipeout}
        right={swipeoutBtns}
        sensitivity={30}
        style={styles.swipeContainer}
      >
        <View style={containerStyles}>
          <Ripple {...rippleProps} onPress={this.onPressItem}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.cardsQuantity}>{`${cardsQuantity} cards`}</Text>
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
    flex: 1,
    width: '100%',
    borderRadius: 3,
    marginBottom: 15,
  },
  container: {
    width: '100%',
    height: '100%',
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
    color: $white,
  },
  cardsQuantity: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: '500',
    color: $white,
  },
});

export default withNavigation(SetItem);
