import React, { PureComponent } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DangerZone } from 'expo';

import { animateNewEntryIcon } from './animations';
import { hexToRgb, $yellow, $darkBlue } from '../../utils/colors';

const { Lottie } = DangerZone;
const NewEntryIcon = require('../../assets/lottieAnimations/newEntryIcon.json');

/**
 * @class TabBarButton
 * @description Create the button for the navigation footer
 */
class TabBarButton extends PureComponent {
  constructor(props) {
    super(props);

    this.progress = new Animated.Value(0);
  }

  // Animate the icon on click
  animateNewEntry = () => {
    const { newEntryIconClicked } = this.props;

    const params = {
      progress: this.progress,
      newEntryIconClicked,
    };

    animateNewEntryIcon(params).start();
  }

  render() {
    const { onPress, icon } = this.props;

    const yellow = hexToRgb($yellow);

    const rippleProps = {
      style: styles.button,
      rippleCentered: true,
      rippleColor: yellow,
    };

    this.animateNewEntry();

    return (
      <Ripple {...rippleProps} onPress={onPress}>
        {icon !== 'lottie'
          ? <MaterialCommunityIcons color={$darkBlue} name={icon} size={30} />
          : (
            <Lottie
              ref={(animation) => {
                this.animation = animation;
              }}
              progress={this.progress}
              source={NewEntryIcon}
              style={styles.lottie}
            />
          )}
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  lottie: {
    width: '95%',
    height: '115%',
  },
});

export default TabBarButton;
