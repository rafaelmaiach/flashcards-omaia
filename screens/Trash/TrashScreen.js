import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SetList from '../../components/SetList/SetList';
import commonNavigationOptions from '../commonNavigationOptions';

class TrashScreen extends PureComponent {
  static propTypes = {
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Trash',
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
  const deletedSets = setsById.filter(set => set.isDeleted);

  return {
    sets: deletedSets,
  };
};

export default connect(mapStateToProps)(TrashScreen);
