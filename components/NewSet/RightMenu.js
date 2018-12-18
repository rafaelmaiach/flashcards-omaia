import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DangerZone } from 'expo';
import { $white } from '../../utils/colors';

const { Lottie } = DangerZone;
const EditIcon = require('../../assets/lottieAnimations/editIcon.json');

class RightMenu extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.progress = new Animated.Value(0);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      animateIcon: type => this.animateIcon(type),
    });
  }

  openTitleEditor = () => {
    const { navigation } = this.props;
    const toggleModalTitle = navigation.getParam('toggleModalTitle');

    this.animateIcon('open');

    toggleModalTitle();
  }

  openBgColorEditor = () => {
    const { navigation } = this.props;
    const toggleModalSetBgColor = navigation.getParam('toggleModalSetBgColor');

    toggleModalSetBgColor();
  }

  animateIcon = (type) => {
    Animated.timing(
      this.progress,
      {
        toValue: type === 'open' ? 1 : 0,
        duration: 800,
      },
    ).start();
  }

  render() {
    return (
      <View style={styles.rightMenu}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={this.openBgColorEditor}
          style={styles.colorIcon}
        >
          <MaterialCommunityIcons color={$white} name="format-color-fill" size={33} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={this.openTitleEditor}
          style={styles.lottieContainer}
        >
          <Lottie
            ref={(animation) => {
              this.editAnimationIcon = animation;
            }}
            loop={false}
            progress={this.progress}
            source={EditIcon}
            style={styles.lottie}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  colorIcon: {
    width: '50%',
    height: '100%',
    paddingTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieContainer: {
    width: '50%',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default RightMenu;
