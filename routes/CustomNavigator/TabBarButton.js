import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { hexToRgb, $yellow, $darkBlue } from '../../utils/colors';

class TabBarButton extends PureComponent {
  render() {
    const { onPress, icon } = this.props;

    const yellow = hexToRgb($yellow);

    const rippleProps = {
      style: styles.button,
      rippleCentered: true,
      rippleColor: yellow,
    };

    return (
      <Ripple {...rippleProps} onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={30} color={$darkBlue} />
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
});

export default TabBarButton;
