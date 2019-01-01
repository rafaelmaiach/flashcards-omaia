import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, TouchableOpacity, Text, StyleSheet, Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SetList from '../../components/SetList/SetList';

import { deleteTrashSets } from '../../actions/sets';
import { deleteCards } from '../../actions/cards';

import { $white, $darkBlue } from '../../utils/colors';
import { createAlert } from '../../utils/helpers';

import commonNavigationOptions from '../commonNavigationOptions';

/**
 * @class TrashScreen
 * @description Create the Trash screen container
 */
class TrashScreen extends PureComponent {
  static propTypes = {
    clearCards: PropTypes.func.isRequired,
    clearTrash: PropTypes.func.isRequired,
    deletedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Trash',
  };

  showAlert = () => {
    const { deletedIds } = this.props;

    if (deletedIds.length === 0) {
      Alert.alert('Trash is empty');
      return;
    }

    const params = {
      title: 'Clear Trash?',
      message: 'This will permanently delete all sets.',
      onPress: () => this.emptyTrash(deletedIds),
    };

    createAlert(params);
  }

  emptyTrash = (deletedIds) => {
    const { clearTrash, clearCards, sets } = this.props;

    // Get all cards ids from deleted sets
    const setCardsIds = sets
      .map(set => set.cards)
      .filter(ids => ids.length > 0)
      .reduce((acc, curr) => acc.concat([...curr]), []);

    clearCards(setCardsIds);
    clearTrash(deletedIds);
  }

  render() {
    const { sets } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>SETS</Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.showAlert}
            style={styles.clearContainer}
          >
            <MaterialCommunityIcons color={$darkBlue} name="playlist-remove" size={25} />
            <Text style={styles.title}>Clear</Text>
          </TouchableOpacity>
        </View>
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  clearContainer: {
    flexDirection: 'row',
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

const mapStateToProps = ({ sets }) => {
  const setsById = Object.values(sets.byId);
  const deletedSets = setsById.filter(set => set.isDeleted);
  const deletedIds = deletedSets.map(set => set.id);

  return {
    sets: deletedSets,
    deletedIds,
  };
};

const mapDispatchToProps = dispatch => ({
  clearTrash: ids => dispatch(deleteTrashSets(ids)),
  clearCards: ids => dispatch(deleteCards(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrashScreen);
