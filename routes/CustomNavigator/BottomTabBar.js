import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import AnimatedNewEntryButton from './AnimatedNewEntryButton';
import { hexToRgb, $yellow } from '../../utils/colors';

class CustomBottomTabBar extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        index: PropTypes.number,
      }),
    }).isRequired,
    activeTintColor: PropTypes.string.isRequired,
    inactiveTintColor: PropTypes.string.isRequired,
  }

  state = {
    newSetButtonClicked: false,
  }

  getIcon = (condition, icon) => {
    const {
      activeTintColor,
      inactiveTintColor,
    } = this.props;

    return condition ? [icon, activeTintColor] : [`${icon}-outline`, inactiveTintColor];
  }

  toggleNewSet = () => {
    this.setState(prev => ({ newSetButtonClicked: !prev.newSetButtonClicked }));
  }

  render() {
    const {
      newSetButtonClicked,
    } = this.state;

    const {
      navigation,
    } = this.props;

    const { state: { index } } = navigation;

    const changeScreen = screen => () => {
      if (newSetButtonClicked) {
        this.setState(() => ({ newSetButtonClicked: false }), () => {
          navigation.navigate(screen);
        });
        return;
      }
      navigation.navigate(screen);
    };

    const jumpToHome = changeScreen('Home');
    const jumpToNewSet = changeScreen('NewSet');
    const jumpToNewFolder = changeScreen('NewFolder');
    const jumpToTrash = changeScreen('Trash');

    const isAtHomeScreen = index === 0 && !newSetButtonClicked;
    const isAtNewEntryScreen = (index === 1 || index === 2) || newSetButtonClicked;
    const isAtTrashScreen = index === 3 && !newSetButtonClicked;

    const [homeIcon, homeIconColor] = this.getIcon(isAtHomeScreen, 'home');
    const [newSetIcon, newSetIconColor] = this.getIcon(isAtNewEntryScreen, 'plus-box');
    const [trashIcon, trashIconColor] = this.getIcon(isAtTrashScreen, 'trash-can');

    const yellow = hexToRgb($yellow);

    const rippleProps = {
      style: styles.button,
      rippleCentered: true,
      rippleColor: yellow,
    };

    return (
      <Fragment>
        <View style={styles.container}>
          <Ripple {...rippleProps} onPress={jumpToHome}>
            <MaterialCommunityIcons name={homeIcon} size={30} color={homeIconColor} />
          </Ripple>
          <Ripple {...rippleProps} onPress={this.toggleNewSet}>
            <MaterialCommunityIcons name={newSetIcon} size={30} color={newSetIconColor} />
          </Ripple>
          <Ripple {...rippleProps} onPress={jumpToTrash}>
            <MaterialCommunityIcons name={trashIcon} size={30} color={trashIconColor} />
          </Ripple>
        </View>
        <AnimatedNewEntryButton
          jumpToNewSet={jumpToNewSet}
          jumpToNewFolder={jumpToNewFolder}
          newSetButtonClicked={newSetButtonClicked}
          toggleNewSet={this.toggleNewSet}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    width: '100%',
  },
  button: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default CustomBottomTabBar;
