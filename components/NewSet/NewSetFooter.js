import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { DangerZone } from 'expo';
import { resetNewSet } from '../../actions/newSet';
import { $grey, $darkBlue } from '../../utils/colors';

const { Lottie } = DangerZone;
const SubmitIcon = require('./submit.json');

class NewSetFooter extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    resetNewSetInfo: PropTypes.func.isRequired,
    submitSet: PropTypes.func.isRequired,
  }

  state = {
    progress: new Animated.Value(0),
  }

  resetNavigation = () => {
    const { navigation, resetNewSetInfo } = this.props;
    resetNewSetInfo();
    navigation.goBack();
  }

  onPress = () => {
    const { progress } = this.state;
    const { submitSet } = this.props;

    submitSet();

    Animated.timing(
      progress,
      {
        toValue: 1,
        duration: 1800,
      },
    ).start(this.resetNavigation);
  }

  render() {
    const { progress } = this.state;

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
            progress={progress}
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
    borderTopColor: $grey,
    borderTopWidth: 0.25,
  },
  buttonContainer: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  lottie: {
    width: '100%',
    height: '75%',
  },
  submitText: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: $darkBlue,
  },
});

const mapDispatchToProps = dispatch => ({
  resetNewSetInfo: () => dispatch(resetNewSet()),
});

export default connect(null, mapDispatchToProps)(NewSetFooter);
