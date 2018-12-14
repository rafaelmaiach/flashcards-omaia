import React, { PureComponent } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DangerZone } from 'expo';
import { hexToRgb, $yellow, $darkBlue } from '../../utils/colors';

const { Lottie } = DangerZone;
const NewEntryIcon = require('./newEntry.json');

class TabBarButton extends PureComponent {
  state = {
    progress: new Animated.Value(0),
  }

  animateNewEntry = () => {
    const { progress } = this.state;
    const { newEntryIconClicked } = this.props;
    Animated.timing(progress, {
      toValue: newEntryIconClicked ? 1 : 0,
      duration: 800,
    }).start();
  }

  render() {
    const { progress } = this.state;
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
              progress={progress}
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
