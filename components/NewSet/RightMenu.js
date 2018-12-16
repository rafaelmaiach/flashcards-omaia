import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, TouchableWithoutFeedback,
} from 'react-native';
import { DangerZone } from 'expo';
import { $white } from '../../utils/colors';

const { Lottie } = DangerZone;
const EditIcon = require('../CustomNavigator/newEntry.json');

class RightMenu extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    progress: new Animated.Value(0),
  }

  openEditor = () => {
    const { progress } = this.state;
    const { navigation } = this.props;
    const toggleModalVisible = navigation.getParam('toggleModalVisible');

    Animated.timing(
      progress,
      {
        toValue: 1,
        duration: 1000,
      },
    ).start();

    toggleModalVisible();
  }

  render() {
    const { progress } = this.state;

    return (
      <View style={styles.rightMenu}>
        <TouchableWithoutFeedback onPress={this.openEditor}>
          <Lottie
            ref={(animation) => {
              this.animation = animation;
            }}
            progress={progress}
            source={EditIcon}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightMenu: {
    flex: 1,
    backgroundColor: $white,
    width: 50,
    height: '100%',
  },
});

export default RightMenu;
