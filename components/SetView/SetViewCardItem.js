import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { $lightBlue, $white } from '../../utils/colors';

class SetViewCardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
  }

  render() {
    const { frontText, backText } = this.props;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.frontTextContainer}>
          <Text style={styles.frontText}>{frontText}</Text>
        </View>
        <View style={styles.backTextContainer}>
          <Text style={styles.backText}>{backText}</Text>
        </View>
        <View style={styles.soundIconContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.soundIconButton}>
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
