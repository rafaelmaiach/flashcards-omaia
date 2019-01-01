import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Speech } from 'expo';
import { AntDesign } from '@expo/vector-icons';

import { $white } from '../../utils/colors';

/**
 * @class SetViewCardItem
 * @description Create the card for set view
 */
class SetViewCardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
  }

  state = {
    speakingText: '', // front or back
    speaking: false,
  }

  // Stops the speak
  resetSpeak = () => this.setState(() => ({ speakingText: '', speaking: false }));

  // Resets the highlight text color
  resetHighlight = () => this.setState(() => ({ speakingText: '' }));

  // Start playing audio for the front card text
  startFrontSound = () => {
    const { speaking } = this.state;
    const { frontText } = this.props;

    if (!speaking) {
      Speech.speak(frontText, {
        onStart: this.setFrontTextHighlight,
        onDone: this.startBackSound,
      });
    }
  }

  // Start playing audio for the back card text
  startBackSound = () => {
    const { backText } = this.props;

    this.resetHighlight();

    Speech.speak(backText, {
      onStart: this.setBackTextHighlight,
      onDone: this.resetSpeak,
    });
  }

  // Add highlight to front card text
  setFrontTextHighlight = () => this.setState(() => ({ speakingText: 'front', speaking: true }));

  // Add highlight to back card text
  setBackTextHighlight = () => this.setState(() => ({ speakingText: 'back' }));

  render() {
    const { speakingText } = this.state;
    const { frontText, backText, themeColor } = this.props;

    const frontTextContainerStyle = {
      ...styles.frontTextContainer,
      borderRightWidth: 0.5,
      borderColor: `${themeColor}`,
    };

    const highlightStyle = {
      color: themeColor,
      fontWeight: 'bold',
    };

    const bgColorTheme = { backgroundColor: themeColor };
    const borderColorTheme = { borderColor: themeColor };

    const highlightFront = speakingText === 'front';
    const highlightBack = speakingText === 'back';

    const frontTextStyle = highlightFront ? highlightStyle : {};
    const backTextStyle = highlightBack ? highlightStyle : {};

    return (
      <View style={[styles.cardContainer, borderColorTheme]}>
        <View style={frontTextContainerStyle}>
          <Text style={frontTextStyle}>{frontText}</Text>
        </View>
        <View style={styles.backTextContainer}>
          <Text style={backTextStyle}>{backText}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={this.startFrontSound}
          style={[styles.soundIconButton, bgColorTheme]}
        >
          <AntDesign color={$white} name="sound" size={20} />
          <Text style={styles.soundText}>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '99%',
    minHeight: 50,
    borderRadius: 3,
    borderWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: $white,
    marginBottom: 15,
  },
  frontTextContainer: {
    padding: 10,
    width: '42%',
  },
  backTextContainer: {
    padding: 10,
    width: '42%',
  },
  soundIconButton: {
    width: '14%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundText: {
    fontSize: 12,
    color: $white,
  },
});

export default SetViewCardItem;
