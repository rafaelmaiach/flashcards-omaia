import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { DangerZone } from 'expo';
import uuidv4 from 'uuid/v4';

import { createSet } from '../../actions/sets';
import { resetNewSet } from '../../actions/newSet';
import { createCards } from '../../actions/cards';
import { setSelectedSet } from '../../actions/selectedSet';
import { resetStatusBarColor } from '../../actions/statusBar';

import { $darkBlue } from '../../utils/colors';

const { Lottie } = DangerZone;
const SubmitIcon = require('../../assets/lottieAnimations/submitIcon.json');

/**
 * @class NewSetFooter
 * @description Create the footer for new set screen to handle submit set
 */
class NewSetFooter extends PureComponent {
  static defaultProps = {
    id: '',
  }

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    cards: PropTypes.object.isRequired,
    id: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    resetNewSetInfo: PropTypes.func.isRequired,
    resetStatusBar: PropTypes.func.isRequired,
    submitNewSet: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.progress = new Animated.Value(0);
  }

  navigateToSetView = (set) => {
    const { navigation, resetNewSetInfo, resetStatusBar } = this.props;
    resetNewSetInfo();
    resetStatusBar();
    navigation.navigate('SetView', {
      title: set.title,
      backgroundColor: set.backgroundColor,
    });
  }

  submitSet = () => {
    const {
      id, title, backgroundColor, cards, navigation, submitNewSet,
    } = this.props;

    const bgColor = backgroundColor || navigation.getParam('backgroundColor');

    const newSet = {
      id: id || uuidv4(),
      title,
      backgroundColor: bgColor,
      isDeleted: false,
      cards,
    };

    submitNewSet(newSet);

    Animated.timing(
      this.progress,
      {
        toValue: 1,
        duration: 1800,
      },
    ).start(() => this.navigateToSetView(newSet));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={this.submitSet}
          style={styles.buttonContainer}
        >
          <Lottie
            ref={(animation) => {
              this.submitAnimatedIcon = animation;
            }}
            loop={false}
            progress={this.progress}
            source={SubmitIcon}
            style={styles.lottie}
          />
          <Text style={styles.submitText}>Save Set</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: '100%',
  },
  buttonContainer: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  lottie: {
    width: '100%',
    height: '73%',
  },
  submitText: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: $darkBlue,
  },
});

const mapStateToProps = ({ newSet }) => {
  const {
    id, title, backgroundColor, cards,
  } = newSet;

  return {
    id,
    title,
    backgroundColor,
    cards,
  };
};

const mapDispatchToProps = dispatch => ({
  submitNewSet: (newSet) => {
    const newSetInfo = {
      ...newSet,
      cards: Object.keys(newSet.cards),
    };

    dispatch(createSet(newSetInfo));
    dispatch(setSelectedSet(newSetInfo));
    dispatch(createCards(newSet.cards));
  },
  resetNewSetInfo: () => dispatch(resetNewSet()),
  resetStatusBar: () => dispatch(resetStatusBarColor()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(withNavigation(NewSetFooter));
