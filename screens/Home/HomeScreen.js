import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SetList from '../../components/SetList/SetList';
import commonNavigationOptions from '../commonNavigationOptions';

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
      <SetList sets={sets} />
    );
  }
}

const mapStateToProps = (state) => {
  const { sets } = state;
  const setsById = Object.values(sets.byId);
  const notDeletedSets = setsById.filter(set => !set.isDeleted);

  return {
    sets: notDeletedSets,
  };
};

export default connect(mapStateToProps)(HomeScreen);
