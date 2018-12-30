import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import chroma from 'chroma-js';

import { $white } from '../../../utils/colors';

class CardItemFooter extends PureComponent {
  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    flipCard: PropTypes.func.isRequired,
    side: PropTypes.string.isRequired,
  }

  render() {
    const { side, bgColor, flipCard } = this.props;

    const footerStyles = {
      ...styles.footerContainer,
      backgroundColor: chroma(bgColor).darken(1).hex(),
    };

    const flipIcon = side === 'front' ? 'flip-to-back' : 'flip-to-front';

    return (
      <View style={footerStyles}>
        <TouchableOpacity activeOpacity={0.75} onPress={flipCard} style={styles.flipButton}>
          <MaterialIcons color={$white} name={flipIcon} size={30} />
          <Text style={styles.flipButtonText}>Answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  flipButton: {
    alignItems: 'center',
  },
  flipButtonText: {
    color: $white,
    paddingTop: 5,
  },
});

export default CardItemFooter;
