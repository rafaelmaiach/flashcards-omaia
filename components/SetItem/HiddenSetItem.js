import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import { deleteSet, restoreSet } from '../../actions/sets';
import { $white } from '../../utils/colors';

class HiddenSetItem extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    moveToTrash: PropTypes.func.isRequired,
    restoreFromTrash: PropTypes.func.isRequired,
  };

  showAlertDelete = () => {
    const { id, moveToTrash } = this.props;

    Alert.alert(
      'Delete Set',
      'Are you sure you want to delete this set?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => moveToTrash(id, 'move') },
      ],
      { cancelable: false },
    );
  };

  showAlertRestore = () => {
    const { id, restoreFromTrash } = this.props;

    Alert.alert(
      'Restore Set',
      'Are you sure you want to restore this set?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => restoreFromTrash(id) },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { backgroundColor, color, isDeleted } = this.props;
    const rowBackStyle = {
      ...styles.rowBack,
      backgroundColor,
    };

    const showAlert = isDeleted ? this.showAlertRestore : this.showAlertDelete;

    return (
      <View style={rowBackStyle}>
        <Ripple
          onPress={showAlert}
          rippleCentered
          rippleColor={color}
          style={styles.iconContainer}
        >
          {isDeleted
            ? <MaterialCommunityIcons color={$white} name="restore" size={30} />
            : <AntDesign color={$white} name="delete" size={30} /> }
        </Ripple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  moveToTrash: id => dispatch(deleteSet(id, 'move')),
  restoreFromTrash: id => dispatch(restoreSet(id)),
});

export default connect(null, mapDispatchToProps)(HiddenSetItem);
