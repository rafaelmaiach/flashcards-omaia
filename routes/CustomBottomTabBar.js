import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { $darkBlue } from '../utils/colors';

class CustomBottomTabBar extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        index: PropTypes.number,
      }),
    }).isRequired,
    activeTintColor: PropTypes.string.isRequired,
    inactiveTintColor: PropTypes.string.isRequired,
    jumpTo: PropTypes.func.isRequired,
  }

  state = {
    newSetButtonClicked: false,
    hiddenIconsContainerSize: new Animated.Value(0),
    hiddenIconSize: new Animated.Value(0),
    hiddenIconOpacity: new Animated.Value(0),
  }

  getIcon = (condition, icon) => {
    const {
      activeTintColor,
      inactiveTintColor,
    } = this.props;

    return condition ? [icon, activeTintColor] : [`${icon}-outline`, inactiveTintColor];
  }

  startNewSetAnimation = () => {
    const {
      hiddenIconSize, hiddenIconsContainerSize, hiddenIconOpacity, newSetButtonClicked,
    } = this.state;

    Animated.sequence([
      Animated.timing(
        hiddenIconsContainerSize,
        {
          toValue: newSetButtonClicked ? 1 : 0,
          duration: 50,
        },
      ),
      Animated.parallel([
        Animated.timing(
          hiddenIconSize,
          {
            toValue: newSetButtonClicked ? 65 : 0,
            duration: 100,
          },
        ),
        Animated.timing(
          hiddenIconOpacity,
          {
            toValue: newSetButtonClicked ? 1 : 0,
            duration: 100,
          },
        ),
      ]),
    ]).start();
  }

  toggleNewSet = () => {
    this.setState(prev => ({ newSetButtonClicked: !prev.newSetButtonClicked }), () => {
      this.startNewSetAnimation();
    });
  }

  render() {
    const {
      newSetButtonClicked,
      hiddenIconSize,
      hiddenIconOpacity,
      hiddenIconsContainerSize,
    } = this.state;

    const {
      navigation: { state: { index } },
      jumpTo,
    } = this.props;

    const jumpToHome = () => jumpTo('Home');
    const jumpToTrash = () => jumpTo('Trash');

    const isAtHomeScreen = index === 0 && !newSetButtonClicked;
    const isAtTrashScreen = index === 1 && !newSetButtonClicked;

    const [homeIcon, homeIconColor] = this.getIcon(isAtHomeScreen, 'home');
    const [trashIcon, trashIconColor] = this.getIcon(isAtTrashScreen, 'trash-can');
    const [newSetIcon, newSetIconColor] = this.getIcon(newSetButtonClicked, 'plus-box');

    const { height } = Dimensions.get('window');

    const aditionalHiddenContainerStyles = {
      transform: [{ scale: hiddenIconsContainerSize }],
      height,
    };

    const aditionalHiddenIconStyles = {
      bottom: hiddenIconSize,
      transform: [{ scale: hiddenIconOpacity }],
    };

    const hiddenContainerStyles = {
      ...styles.hiddenIconsContainer,
      ...aditionalHiddenContainerStyles,
    };

    const hiddenIconStyles = { ...styles.hiddenIcons, ...aditionalHiddenIconStyles };

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    return (
      <Fragment>
        <View style={styles.container}>
          <TouchableOpacity onPress={jumpToHome} activeOpacity={0.75}>
            <MaterialCommunityIcons name={homeIcon} size={25} color={homeIconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleNewSet} activeOpacity={0.75}>
            <MaterialCommunityIcons name={newSetIcon} size={25} color={newSetIconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={jumpToTrash} activeOpacity={0.75}>
            <MaterialCommunityIcons name={trashIcon} size={25} color={trashIconColor} />
          </TouchableOpacity>
        </View>
        <AnimatedTouchable style={hiddenContainerStyles} onPress={this.toggleNewSet}>
          <Animated.View style={hiddenIconStyles}>
            <TouchableOpacity onPress={jumpToTrash} activeOpacity={0.75}>
              <MaterialCommunityIcons name="cards" size={30} color={$darkBlue} />
            </TouchableOpacity>
          </Animated.View>
        </AnimatedTouchable>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    width: '100%',
  },
  hiddenIconsContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100%',
    top: 0,
    left: 0,
  },
  hiddenIcons: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: '100%',
  },
});

export default CustomBottomTabBar;
