import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import SetList from '../../components/SetList/SetList';

import { resetStatusBarColor } from '../../actions/statusBar';

import { $white, $darkBlue } from '../../utils/colors';

import commonNavigationOptions from '../commonNavigationOptions';

/**
 * @class HomeScreen
 * @description Create the Home container
 */
class HomeScreen extends PureComponent {
  static propTypes = {
    resetStatusBar: PropTypes.func.isRequired,
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Home',
  };

  componentDidMount() {
    const { resetStatusBar } = this.props;
    resetStatusBar();
  }

  render() {
    const { sets } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SETS</Text>
        <SetList sets={sets} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: $white,
  },
  title: {
    color: $darkBlue,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1.7,
    marginBottom: 20,
    paddingTop: 3,
    paddingLeft: 3,
  },
});


const mapStateToProps = (state) => {
  const { sets } = state;

  const setsById = sets.allIds.map((id) => {
    const set = sets.byId[id];

    if (!set.isDeleted) {
      return set;
    }
    return null;
  }).filter(set => set);

  return {
    sets: setsById,
  };
};

const mapDispatchToProps = dispatch => ({
  resetStatusBar: () => dispatch(resetStatusBarColor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
