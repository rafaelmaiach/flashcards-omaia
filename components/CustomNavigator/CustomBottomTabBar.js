import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import TabBarButton from './TabBarButton';
import AnimatedNewEntryButton from './AnimatedNewEntryButton';

import { $grey, $fullWhite } from '../../utils/colors';

/**
 * @class CustomBottomTabBar
 * @description Create the bottom tab navigator customized for have icons
 */
class CustomBottomTabBar extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    newEntryIconClicked: false,
  }

  getIcon = (condition, icon) => (condition ? icon : `${icon}-outline`);

  toggleNewSet = () => this.setState(prev => ({ newEntryIconClicked: !prev.newEntryIconClicked }));

  changeScreen = screen => () => {
    const { navigation } = this.props;

    this.setState(
      () => ({ newEntryIconClicked: false }),
      () => navigation.navigate(screen),
    );
  };

  render() {
    const { newEntryIconClicked } = this.state;

    const {
      navigation,
    } = this.props;

    const { state: { index } } = navigation;

    const navigateToHome = this.changeScreen('Home');
    const navigateToNewSet = this.changeScreen('NewSetScreen');
    const navigateToTrash = this.changeScreen('Trash');

    const isAtHomeScreen = index === 0;
    const isAtTrashScreen = index === 1;

    const homeIcon = this.getIcon(isAtHomeScreen, 'home');
    const trashIcon = this.getIcon(isAtTrashScreen, 'trash-can');

    return (
      <Fragment>
        <View style={styles.container}>
          <TabBarButton icon={homeIcon} onPress={navigateToHome} />
          <TabBarButton icon="lottie" newEntryIconClicked={newEntryIconClicked} onPress={this.toggleNewSet} />
          <TabBarButton icon={trashIcon} onPress={navigateToTrash} />
        </View>
        <AnimatedNewEntryButton
          navigateToNewSet={navigateToNewSet}
          newEntryIconClicked={newEntryIconClicked}
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
    height: '10%',
    width: '100%',
    backgroundColor: $fullWhite,
    borderTopColor: $grey,
    borderTopWidth: 0.25,
  },
});

export default CustomBottomTabBar;
