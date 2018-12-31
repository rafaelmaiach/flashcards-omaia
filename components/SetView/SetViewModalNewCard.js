import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput } from 'react-native';
import uuidv4 from 'uuid/v4';
import ModalWrapper from '../Common/ModalWrapper';

import { createCards } from '../../actions/cards';
import { addNewCardToSet } from '../../actions/sets';

import { $white, $black } from '../../utils/colors';

class CardItemText extends PureComponent {
  static propTypes = {
    addCardToSet: PropTypes.func.isRequired,
    setId: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    toggleModalNewCard: PropTypes.func.isRequired,
  }

  state = {
    frontCardText: '',
    backCardText: '',
  };

  onCloseModal = () => {
    const { frontCardText, backCardText } = this.state;
    const {
      setId, themeColor, toggleModalNewCard, addCardToSet,
    } = this.props;

    const cardId = uuidv4();

    const cardTemplate = {
      id: cardId,
      frontText: frontCardText || 'Write a question',
      backText: backCardText || 'Write an answer',
      backgroundColor: themeColor,
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
    const { themeColor } = this.props;

    const modalTitleStyles = {
      ...styles.modalInputTitle,
      color: themeColor,
    };

    const modalInputStyles = {
      ...styles.modalInput,
      borderColor: themeColor,
    };


    return (
      <ModalWrapper onCancel={this.onCancelModal} visible>
        <Text style={modalTitleStyles}>FRONT CARD TEXT</Text>
        <TextInput
          maxLength={75}
          onChangeText={this.onChangeFrontText}
          style={modalInputStyles}
          value={frontCardText}
        />

        <Text style={modalTitleStyles}>BACK CARD TEXT</Text>
        <TextInput
          maxLength={75}
          onChangeText={this.onChangeBackText}
          style={modalInputStyles}
          value={backCardText}
        />
      </ModalWrapper>
    );
  }
}

const styles = StyleSheet.create({
  modalInputTitle: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 20,
  },
  modalInput: {
    height: 40,
    fontSize: 16,
    color: $black,
    borderBottomWidth: 2,
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
