import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, TouchableWithoutFeedback,
} from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;
const EditIcon = require('./pencil.json');

class RightMenu extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    progress: new Animated.Value(0),
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      animateIcon: type => this.animateIcon(type),
    });
  }

  openEditor = () => {
    const { navigation } = this.props;
    const toggleModalVisible = navigation.getParam('toggleModalVisible');

    this.animateIcon('open');

    toggleModalVisible();
  }

  animateIcon = (type) => {
    const { progress } = this.state;

    Animated.timing(
      progress,
      {
        toValue: type === 'open' ? 1 : 0,
        duration: 800,
      },
    ).start();
  }

  render() {
    const { progress } = this.state;
    return (
      <View style={styles.rightMenu}>
        <TouchableWithoutFeedback onPress={this.openEditor}>
          <Lottie
            ref={(animation) => {
              this.editAnimationIcon = animation;
            }}
            loop={false}
            progress={progress}
            source={EditIcon}
            style={styles.lottie}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightMenu: {
    flex: 1,
    width: 50,
    height: '100%',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default RightMenu;
