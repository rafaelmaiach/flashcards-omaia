import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight, TouchableOpacity, Dimensions, Animated, StyleSheet, Text, View, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { $darkBlue, $black, $fullWhite } from '../../utils/colors';

class AnimatedNewSetButton extends PureComponent {
  static propTypes = {
    navigateToNewFolder: PropTypes.func.isRequired,
    navigateToNewSet: PropTypes.func.isRequired,
    newEntryIconClicked: PropTypes.bool.isRequired,
    toggleNewSet: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { height } = Dimensions.get('window');
    this.windowHeight = Platform.OS === 'ios' ? height * 0.88 : height * 0.87;

    this.state = {
      hiddenIconsContainerSize: new Animated.Value(0),
      buttonContainerOpacity: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { newEntryIconClicked } = nextProps;

    if (newEntryIconClicked) {
      this.openNewSetAnimation();
      return;
    }

    this.closeNewSetAnimation();
  }

  openNewSetAnimation = () => {
    const { hiddenIconsContainerSize, buttonContainerOpacity } = this.state;

    Animated.sequence([
      Animated.timing(
        hiddenIconsContainerSize,
        {
          toValue: this.windowHeight,
          duration: 100,
        },
      ),
      Animated.timing(
        buttonContainerOpacity,
        {
          toValue: 1,
          duration: 350,
        },
      ),
    ]).start();
  }

  closeNewSetAnimation = () => {
    const { hiddenIconsContainerSize, buttonContainerOpacity } = this.state;

    Animated.sequence([
      Animated.timing(
        buttonContainerOpacity,
        {
          toValue: 0,
          duration: 350,
        },
      ),
      Animated.timing(
        hiddenIconsContainerSize,
        {
          toValue: 0,
          duration: 100,
        },
      ),
    ]).start();
  }

  render() {
    const { hiddenIconsContainerSize, buttonContainerOpacity } = this.state;
    const { toggleNewSet, navigateToNewSet, navigateToNewFolder } = this.props;

    const hiddenContainerStyles = {
      ...styles.hiddenIconsContainer,
      height: hiddenIconsContainerSize,
    };

    const buttonContainerAnimation = {
      opacity: buttonContainerOpacity,
    };

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

    return (
      <AnimatedTouchable onPress={toggleNewSet} style={hiddenContainerStyles} underlayColor="transparent">
        <Animated.View style={[styles.buttonsContainer, buttonContainerAnimation]}>
          <View style={[styles.iconContainer, styles.iconContainerLeft]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={navigateToNewSet}
              style={styles.iconContainerPosition}
            >
              <MaterialCommunityIcons color={$darkBlue} name="cards" size={30} />
              <Text style={styles.iconText}>New Set</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer, styles.iconContainerRight]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={navigateToNewFolder}
              style={styles.iconContainerPosition}
            >
              <MaterialCommunityIcons color={$darkBlue} name="folder" size={30} />
              <Text style={styles.iconText}>New Folder</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </AnimatedTouchable>
    );
  }
}

const styles = StyleSheet.create({
  hiddenIconsContainer: {
    position: 'absolute',
    width: '100%',
    left: 0,
    justifyContent: 'flex-end',
    backgroundColor: `${$black}4D`,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '50%',
    justifyContent: 'center',
    backgroundColor: $fullWhite,
  },
  iconContainerLeft: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  iconContainerRight: {
    alignItems: 'flex-start',
    paddingLeft: 10,
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
