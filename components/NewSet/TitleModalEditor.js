import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, StyleSheet, TextInput,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import { editTitle } from '../../actions/newSet';

import { $white, $black, $lightBlue } from '../../utils/colors';

class TitleModalEditor extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    submitNewTitle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    toggleModalTitle: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  state = {
    newTitle: '',
  };

  componentWillReceiveProps(nextProps) {
    const { newTitle } = this.state;
    const { title } = nextProps;

    if (title !== newTitle) {
      this.setState(() => ({ newTitle: title }));
    }
  }

  onChangeText = newTitle => this.setState({ newTitle });

  onCloseModal = () => {
    const { newTitle } = this.state;
    const { toggleModalTitle, navigation, submitNewTitle } = this.props;

    submitNewTitle(newTitle);
    navigation.setParams({ title: newTitle });

    const animateIcon = navigation.getParam('animateIcon');
    animateIcon('close');

    toggleModalTitle();
  }

  render() {
    const { newTitle } = this.state;
    const { visible } = this.props;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={$black}
        backdropOpacity={0.5}
        isVisible={visible}
        onBackButtonPress={this.onCloseModal}
        onBackdropPress={this.onCloseModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.editSetTitle}>EDIT TITLE</Text>
          <TextInput
            maxLength={50}
            onChangeText={this.onChangeText}
            style={styles.modalInput}
            value={newTitle}
          />
          <View style={styles.closeTextContainer}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={this.onCloseModal}
            >
              <Text style={styles.closeText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    backgroundColor: $white,
    borderRadius: 3,
    padding: 20,
  },
  editSetTitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: $lightBlue,
    fontWeight: '800',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    fontSize: 16,
    color: $black,
    borderBottomColor: $lightBlue,
    borderBottomWidth: 2,
  },
  closeTextContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
    color: $lightBlue,
  },
});

const mapStateToProps = ({ newSet }) => ({
  title: newSet.title,
});

const mapDispatchToProps = dispatch => ({
  submitNewTitle: newTitle => dispatch(editTitle(newTitle)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(withNavigation(TitleModalEditor));
