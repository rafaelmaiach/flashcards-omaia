import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Speech } from 'expo';

import { AntDesign } from '@expo/vector-icons';

import { $lightBlue, $white } from '../../utils/colors';

class SetViewCardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
  }

  state = {
    speakingText: '', // front or back
  }

  resetSpeak = () => this.setState(() => ({ speakingText: '' }));

  startFrontSound = () => {
    const { frontText } = this.props;

    Speech.speak(frontText, {
      onStart: this.setFrontTextHighlight,
      onDone: this.startBackSound,
    });
  }

  startBackSound = () => {
    const { backText } = this.props;

    this.resetSpeak();

    Speech.speak(backText, {
      onStart: this.setBackTextHighlight,
      onDone: this.resetSpeak,
    });
  }

  setFrontTextHighlight = () => this.setState(() => ({ speakingText: 'front' }));

  setBackTextHighlight = () => this.setState(() => ({ speakingText: 'back' }));

  render() {
    const { speakingText } = this.state;
    const { frontText, backText } = this.props;

    const highlightStyle = {
      color: $lightBlue,
      fontWeight: 'bold',
    };

    const highlightFront = speakingText === 'front';
    const highlightBack = speakingText === 'back';

    const frontTextStyle = highlightFront ? highlightStyle : {};
    const backTextStyle = highlightBack ? highlightStyle : {};

    return (
      <View style={styles.cardContainer}>
        <View style={styles.frontTextContainer}>
          <Text style={frontTextStyle}>{frontText}</Text>
        </View>
        <View style={styles.backTextContainer}>
          <Text style={backTextStyle}>{backText}</Text>
        </View>
        <View style={styles.soundIconContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={this.startFrontSound}
            style={styles.soundIconButton}
          >
            <AntDesign color={$white} name="sound" size={20} />
            <Text style={styles.soundText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    minHeight: 50,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: $lightBlue,
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
  soundIconContainer: {
    width: '14%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $lightBlue,
  },
  soundIconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundText: {
    fontSize: 12,
    color: $white,
  },
});
export default SetViewCardItem;
