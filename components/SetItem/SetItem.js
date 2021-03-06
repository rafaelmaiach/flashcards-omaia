import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import Swipeout from 'react-native-swipeout';
import chroma from 'chroma-js';

import HiddenSetItem from './HiddenSetItem';

import { setSelectedSet } from '../../actions/selectedSet';

import { $white } from '../../utils/colors';

/**
 * @class SetItem
 * @description Create each item for set list
 */
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

  // Create the buttons for swipe element
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

    // By default, it has only the delete button
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

    // If in trash screen (deleted set) it will show only the restore
    // Otherwise will show edit and remove
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
      navigation,
      selectSet,
      ...set
    } = this.props;

    if (set.isDeleted) {
      return;
    }

    selectSet(set);

    navigation.navigate('SetView', {
      title: set.title,
      backgroundColor: set.backgroundColor,
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
    const cardsQuantityText = `${cardsQuantity} card${cardsQuantity === 1 ? '' : 's'}`;

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
            <Text style={styles.cardsQuantity}>{cardsQuantityText}</Text>
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

const mapDispatchToProps = dispatch => ({
  selectSet: set => dispatch(setSelectedSet(set)),
});

export default connect(null, mapDispatchToProps)(withNavigation(SetItem));
