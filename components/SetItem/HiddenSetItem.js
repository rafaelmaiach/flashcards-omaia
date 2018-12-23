import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import { deleteSet, restoreSet } from '../../actions/sets';
import { $white } from '../../utils/colors';

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

  goToEdition = () => {
    const { navigation, setInfo, closeSwipeout } = this.props;

    closeSwipeout();
    navigation.navigate('NewSetScreen', {
      setInfo,
    });
  }

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
