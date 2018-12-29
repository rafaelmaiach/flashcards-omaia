import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, StyleSheet, TouchableOpacity, Text, TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import uuidv4 from 'uuid/v4';

import { createCards } from '../../actions/cards';
import { addNewCardToSet } from '../../actions/sets';

import {
  $white, $black, $lightBlue, $lightRed, $darkGreen,
} from '../../utils/colors';

class CardItemText extends PureComponent {
  static propTypes = {
    addCardToSet: PropTypes.func.isRequired,
    setBackgroundColor: PropTypes.string.isRequired,
    setId: PropTypes.string.isRequired,
    toggleModalNewCard: PropTypes.func.isRequired,
  }

  state = {
    frontCardText: '',
    backCardText: '',
  };

  onCloseModal = () => {
    const { frontCardText, backCardText } = this.state;
    const {
      setId, setBackgroundColor, toggleModalNewCard, addCardToSet,
    } = this.props;

    const cardId = uuidv4();

    const cardTemplate = {
      id: cardId,
      frontText: frontCardText || 'Write a question',
      backText: backCardText || 'Write an answer',
      backgroundColor: setBackgroundColor,
      foregroundColor: $white,
    };

    addCardToSet(setId, cardTemplate.id, { [cardId]: cardTemplate });
    toggleModalNewCard();
  }

  onCancelModal = () => {
    const { toggleModalNewCard } = this.props;
    toggleModalNewCard();
  }

  onChangeFrontText = frontCardText => this.setState({ frontCardText });

  onChangeBackText = backCardText => this.setState({ backCardText });

  render() {
    const { frontCardText, backCardText } = this.state;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={$black}
        backdropOpacity={0.5}
        isVisible
        onBackButtonPress={this.onCancelModal}
        onBackdropPress={this.onCancelModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.editSetTitle}>FRONT CARD TEXT</Text>
          <TextInput
            maxLength={75}
            onChangeText={this.onChangeFrontText}
            style={styles.modalInput}
            value={frontCardText}
          />

          <Text style={styles.editSetTitle}>BACK CARD TEXT</Text>
          <TextInput
            maxLength={75}
            onChangeText={this.onChangeBackText}
            style={styles.modalInput}
            value={backCardText}
          />

          <View style={styles.closeTextContainer}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={this.onCancelModal}
            >
              <Text style={[styles.closeText, styles.cancelText]}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={this.onCloseModal}
            >
              <Text style={[styles.closeText, styles.saveText]}>
                SAVE
              </Text>
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
    marginBottom: 10,
    marginTop: 20,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cancelText: {
    color: $lightRed,
    paddingRight: 20,
  },
  saveText: {
    color: $darkGreen,
  },
});

const mapDispatchToProps = dispatch => ({
  addCardToSet: (setId, cardId, card) => {
    dispatch(createCards(card));
    dispatch(addNewCardToSet(setId, cardId));
  },
});

const connector = connect(null, mapDispatchToProps);
export default connector(CardItemText);
