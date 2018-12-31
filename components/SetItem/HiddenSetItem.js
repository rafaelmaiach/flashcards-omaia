import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';

import { deleteSet, restoreSet } from '../../actions/sets';

import { $white } from '../../utils/colors';
import { createAlert } from '../../utils/helpers';

/**
 * @class HiddenSetItem
 * @description Creates the hidden component behind set item
 * It shows the control buttons on swipe
 */
class HiddenSetItem extends PureComponent {
  static defaultProps = {
    isEdit: false,
    isDeleted: false,
    setInfo: {},
  }

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    closeSwipeout: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
    isEdit: PropTypes.bool,
    moveToTrash: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    restoreFromTrash: PropTypes.func.isRequired,
    setInfo: PropTypes.object,
  };

  // Show an alert to confirm the set delete action
  showAlertDelete = () => {
    const { id, moveToTrash } = this.props;

    const params = {
      title: 'Delete Set',
      message: 'Are you sure you want to delete this set?',
      onPress: () => moveToTrash(id, 'move'),
    };

    createAlert(params);
  };

  // Show an alert to confirm the set restore action
  showAlertRestore = () => {
    const { id, restoreFromTrash } = this.props;

    const params = {
      title: 'Restore Set',
      message: 'Are you sure you want to restore this set?',
      onPress: () => restoreFromTrash(id),
    };

    createAlert(params);
  };

  // Go to edit page passing the set information to be editted
  goToEdition = () => {
    const { navigation, setInfo, closeSwipeout } = this.props;

    closeSwipeout();
    navigation.navigate('NewSetScreen', {
      setInfo,
    });
  }

  // Check if the click was on remove set or edit set
  onPress = () => {
    const { isDeleted, isEdit, closeSwipeout } = this.props;

    if (isEdit) {
      this.goToEdition();
      return;
    }

    const showAlert = isDeleted ? this.showAlertRestore : this.showAlertDelete;
    closeSwipeout();
    showAlert();
  }

  render() {
    const {
      backgroundColor, color, isDeleted, isEdit,
    } = this.props;

    const rowBackStyle = {
      ...styles.rowBack,
      backgroundColor,
    };

    const trashIcon = isDeleted
      ? <MaterialCommunityIcons color={$white} name="restore" size={30} />
      : <AntDesign color={$white} name="delete" size={30} />;

    const iconToRender = isEdit
      ? <AntDesign color={$white} name="edit" size={30} />
      : trashIcon;

    return (
      <View style={rowBackStyle}>
        <Ripple
          onPress={this.onPress}
          rippleCentered
          rippleColor={color}
          style={styles.iconContainer}
        >
          {iconToRender}
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

const connector = connect(null, mapDispatchToProps);
const HiddenSetItemNavigator = withNavigation(HiddenSetItem);
export default connector(HiddenSetItemNavigator);
