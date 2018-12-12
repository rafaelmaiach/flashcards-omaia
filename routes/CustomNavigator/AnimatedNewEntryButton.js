import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight, TouchableOpacity, Dimensions, Animated, StyleSheet, Text, View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { $darkBlue } from '../../utils/colors';

class AnimatedNewSetButton extends PureComponent {
  static propTypes = {
    navigateToNewSet: PropTypes.func.isRequired,
    navigateToNewFolder: PropTypes.func.isRequired,
    newEntryIconClicked: PropTypes.bool.isRequired,
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
    const { newEntryIconClicked } = nextProps;

    const parallelAnimation = this.createParallelAnimation(newEntryIconClicked);

    if (newEntryIconClicked) {
      this.openNewSetAnimation(parallelAnimation);
      return;
    }

    this.closeNewSetAnimation(parallelAnimation);
  }

  createParallelAnimation = (newEntryIconClicked) => {
    const { hiddenIconXPosition, hiddenIconYPosition, hiddenIconSize } = this.state;
    return Animated.parallel([
      Animated.timing(
        hiddenIconYPosition,
        {
          toValue: newEntryIconClicked ? 10 : 0,
          duration: 350,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        hiddenIconXPosition,
        {
          toValue: newEntryIconClicked ? 65 : 0,
          duration: 350,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        hiddenIconSize,
        {
          toValue: newEntryIconClicked ? 1 : 0,
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

  createAnimatedView = (params) => {
    const {
      containerStyles, buttonSize, onPress, iconName, iconText,
    } = params;

    return (
      <Animated.View style={containerStyles}>
        <TouchableOpacity onPress={onPress} style={buttonSize} activeOpacity={0.8}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={iconName} size={35} color={$darkBlue} />
            <Text style={styles.iconText}>{iconText}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    const { hiddenIconSize, hiddenIconsContainerSize } = this.state;
    const { toggleNewSet, navigateToNewSet, navigateToNewFolder } = this.props;

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

    const NewSetButton = this.createAnimatedView({
      containerStyles: hiddenIconStylesLeft,
      buttonSize,
      onPress: navigateToNewSet,
      iconName: 'cards',
      iconText: 'New Set',
    });

    const NewFolderButton = this.createAnimatedView({
      containerStyles: hiddenIconStylesRight,
      buttonSize,
      onPress: navigateToNewFolder,
      iconName: 'folder',
      iconText: 'New Folder',
    });

    return (
      <AnimatedTouchable style={hiddenContainerStyles} onPress={toggleNewSet} underlayColor="transparent">
        <View style={styles.iconsViewContainer}>
          {NewSetButton}
          {NewFolderButton}
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
