import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight, TouchableOpacity, Dimensions, Animated, StyleSheet, Text, View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { $darkBlue } from '../../utils/colors';

class AnimatedNewSetButton extends PureComponent {
  static propTypes = {
    newSetButtonClicked: PropTypes.bool.isRequired,
    toggleNewSet: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.windowHeight = Dimensions.get('window').height;

    this.state = {
      hiddenIconsContainerSize: new Animated.Value(this.windowHeight),
      hiddenIconYPosition: new Animated.Value(0),
      hiddenIconXPosition: new Animated.Value(0),
      hiddenIconSize: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { newSetButtonClicked } = nextProps;

    const parallelAnimation = this.createParallelAnimation(newSetButtonClicked);

    if (newSetButtonClicked) {
      this.openNewSetAnimation(parallelAnimation);
      return;
    }

    this.closeNewSetAnimation(parallelAnimation);
  }

  createParallelAnimation = (newSetButtonClicked) => {
    const { hiddenIconXPosition, hiddenIconYPosition, hiddenIconSize } = this.state;
    return Animated.parallel([
      Animated.timing(
        hiddenIconYPosition,
        {
          toValue: newSetButtonClicked ? 10 : 0,
          duration: 350,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        hiddenIconXPosition,
        {
          toValue: newSetButtonClicked ? 65 : 0,
          duration: 350,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        hiddenIconSize,
        {
          toValue: newSetButtonClicked ? 1 : 0,
          duration: 350,
          useNativeDriver: true,
        },
      ),
    ]);
  }

  openNewSetAnimation = (parallelAnimation) => {
    const { hiddenIconsContainerSize } = this.state;

    Animated.sequence([
      Animated.timing(
        hiddenIconsContainerSize,
        {
          toValue: 0,
          duration: 100,
        },
      ),
      parallelAnimation,
    ]).start();
  }

  closeNewSetAnimation = (parallelAnimation) => {
    const { hiddenIconsContainerSize } = this.state;

    Animated.sequence([
      parallelAnimation,
      Animated.timing(
        hiddenIconsContainerSize,
        {
          toValue: this.windowHeight,
          duration: 100,
        },
      ),
    ]).start();
  }

  render() {
    const { hiddenIconSize, hiddenIconsContainerSize } = this.state;
    const { toggleNewSet } = this.props;

    const aditionalHiddenContainerStyles = {
      height: this.windowHeight - 110,
      top: hiddenIconsContainerSize,
    };

    const hiddenContainerStyles = {
      ...styles.hiddenIconsContainer,
      ...aditionalHiddenContainerStyles,
    };

    const hiddenIconStylesLeft = { ...styles.hiddenIcons, alignItems: 'flex-end', paddingRight: 20 };
    const hiddenIconStylesRight = { ...styles.hiddenIcons, alignItems: 'flex-start', paddingLeft: 5 };

    const buttonSize = { transform: [{ scale: hiddenIconSize }] };

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

    return (
      <AnimatedTouchable style={hiddenContainerStyles} onPress={toggleNewSet} underlayColor="transparent">
        <View style={styles.iconsViewContainer}>
          <Animated.View style={hiddenIconStylesLeft}>
            <TouchableOpacity onPress={() => {}} style={buttonSize}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="cards" size={30} color={$darkBlue} />
                <Text style={styles.iconText}>New Set</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={hiddenIconStylesRight}>
            <TouchableOpacity onPress={() => {}} style={buttonSize}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="folder" size={30} color={$darkBlue} />
                <Text style={styles.iconText}>New Folder</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </AnimatedTouchable>
    );
  }
}

const styles = StyleSheet.create({
  hiddenIconsContainer: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },
  hiddenIcons: {
    justifyContent: 'center',
    width: '50%',
    height: 65,
  },
  iconsViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: $darkBlue,
  },
});

export default AnimatedNewSetButton;
