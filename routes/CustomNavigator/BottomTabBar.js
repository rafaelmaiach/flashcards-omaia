import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedNewSetButton from './AnimatedNewSetButton';

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
      jumpTo,
    } = this.props;

    const { state: { index } } = navigation;

    const jumpToHome = () => {
      if (newSetButtonClicked) {
        this.setState(() => ({ newSetButtonClicked: false }), () => {
          jumpTo('Home');
        });
        return;
      }
      jumpTo('Home');
    };

    const jumpToTrash = () => {
      if (newSetButtonClicked) {
        this.setState(() => ({ newSetButtonClicked: false }), () => {
          jumpTo('Trash');
        });
        return;
      }

      jumpTo('Trash');
    };

    const isAtHomeScreen = index === 0 && !newSetButtonClicked;
    const isAtTrashScreen = index === 1 && !newSetButtonClicked;

    const [homeIcon, homeIconColor] = this.getIcon(isAtHomeScreen, 'home');
    const [trashIcon, trashIconColor] = this.getIcon(isAtTrashScreen, 'trash-can');
    const [newSetIcon, newSetIconColor] = this.getIcon(newSetButtonClicked, 'plus-box');

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
        <AnimatedNewSetButton
          newSetButtonClicked={newSetButtonClicked}
          navigation={navigation}
          toggleNewSet={this.toggleNewSet}
        />
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
});

export default CustomBottomTabBar;
