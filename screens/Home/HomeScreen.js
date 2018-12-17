import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import SetList from '../../components/SetList/SetList';
import commonNavigationOptions from '../commonNavigationOptions';
import { $white, $darkBlue } from '../../utils/colors';

class HomeScreen extends PureComponent {
  static propTypes = {
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Home',
  };

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
  const setsById = Object.values(sets.byId);
  const notDeletedSets = setsById.filter(set => !set.isDeleted);

  return {
    sets: notDeletedSets,
  };
};

export default connect(mapStateToProps)(HomeScreen);
