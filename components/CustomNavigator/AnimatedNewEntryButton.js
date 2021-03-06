import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight, TouchableOpacity, Dimensions, Animated, StyleSheet, Text, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { openNewSetAnimation, closeNewSetAnimation } from './animations';
import { $darkBlue, $black, $fullWhite } from '../../utils/colors';

/**
 * @class AnimatedNewEntryButton
 * @description Creates the animated component that handles
 * the icon to navigate to New Set Screen
 */
class AnimatedNewSetButton extends PureComponent {
  static propTypes = {
    navigateToNewSet: PropTypes.func.isRequired,
    newEntryIconClicked: PropTypes.bool.isRequired,
    toggleNewSet: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    // Set the modal height to dont overlay footer
    const { height } = Dimensions.get('window');
    this.windowHeight = Platform.OS === 'ios' ? height * 0.876 : height * 0.867;

    this.hiddenIconsContainerSize = new Animated.Value(0);
    this.buttonContainerOpacity = new Animated.Value(0);
  }

  // Handle when the modal need to be closed or open
  componentWillReceiveProps(nextProps) {
    const { newEntryIconClicked } = nextProps;

    const params = {
      hiddenIconsContainerSize: this.hiddenIconsContainerSize,
      buttonContainerOpacity: this.buttonContainerOpacity,
    };

    if (newEntryIconClicked) {
      const openParams = {
        ...params,
        windowHeight: this.windowHeight,
      };

      openNewSetAnimation(openParams).start();
      return;
    }

    closeNewSetAnimation(params).start();
  }

  render() {
    const { toggleNewSet, navigateToNewSet } = this.props;

    const hiddenContainerStyles = {
      ...styles.hiddenIconsContainer,
      height: this.hiddenIconsContainerSize,
    };

    const buttonContainerAnimation = {
      opacity: this.buttonContainerOpacity,
    };

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

    return (
      <AnimatedTouchable onPress={toggleNewSet} style={hiddenContainerStyles} underlayColor="transparent">
        <Animated.View style={[styles.buttonsContainer, buttonContainerAnimation]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={navigateToNewSet}
            style={styles.iconContainerPosition}
          >
            <MaterialCommunityIcons color={$darkBlue} name="cards" size={30} />
            <Text style={styles.iconText}>New Set</Text>
          </TouchableOpacity>
        </Animated.View>
      </AnimatedTouchable>
    );
  }
}

const styles = StyleSheet.create({
  hiddenIconsContainer: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    left: 0,
    justifyContent: 'flex-end',
    backgroundColor: `${$black}1A`,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: $fullWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerPosition: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: $darkBlue,
  },
});

export default AnimatedNewSetButton;
