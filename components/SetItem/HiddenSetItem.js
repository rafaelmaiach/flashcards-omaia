import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import { deleteSet } from '../../actions/sets';
import { $white } from '../../utils/colors';

class HiddenSetItem extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    moveToTrash: PropTypes.func.isRequired,
  };

  deleteSet = () => {
    const { id, moveToTrash } = this.props;
    moveToTrash(id);
  }

  showAlert = () => {
    Alert.alert(
      'Delete Set',
      'Are you sure you want to delete this set?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.deleteSet },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { backgroundColor, color } = this.props;
    const rowBackStyle = {
      ...styles.rowBack,
      backgroundColor,
    };

    return (
      <View style={rowBackStyle}>
        <Ripple
          onPress={this.showAlert}
          rippleCentered
          rippleColor={color}
          style={styles.iconContainer}
        >
          <AntDesign color={$white} name="delete" size={30} />
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
});

export default connect(null, mapDispatchToProps)(HiddenSetItem);
