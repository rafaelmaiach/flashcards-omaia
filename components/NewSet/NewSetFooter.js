import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { DangerZone } from 'expo';
import { createSet } from '../../actions/sets';
import { resetNewSet } from '../../actions/newSet';
import { $darkBlue } from '../../utils/colors';

const { Lottie } = DangerZone;
const SubmitIcon = require('../../assets/lottieAnimations/submitIcon.json');

class NewSetFooter extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    cards: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    resetNewSetInfo: PropTypes.func.isRequired,
    submitNewSet: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.progress = new Animated.Value(0);
  }

  resetNavigation = () => {
    const { navigation, resetNewSetInfo } = this.props;
    resetNewSetInfo();
    navigation.goBack();
  }

  submitSet = () => {
    const {
      id, title, backgroundColor, cards, navigation, submitNewSet,
    } = this.props;
    const bgColor = backgroundColor || navigation.getParam('backgroundColor');

    const newSet = {
      id,
      title,
      createdDate: Date.now(),
      backgroundColor: bgColor,
      isDeleted: false,
      cards,
    };

    submitNewSet(newSet);
  }

  onPress = () => {
    this.submitSet();

    Animated.timing(
      this.progress,
      {
        toValue: 1,
        duration: 1800,
      },
    ).start(this.resetNavigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={this.onPress}
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
          <Text style={styles.submitText}>Submit</Text>
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
  submitNewSet: newSet => dispatch(createSet(newSet)),
  resetNewSetInfo: () => dispatch(resetNewSet()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(withNavigation(NewSetFooter));
