import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import ModalWrapper from '../Common/ModalWrapper';
import ModalInput from '../Common/ModalInput';

import { createCards } from '../../actions/cards';
import { addNewCardToSet } from '../../actions/sets';

import { $white } from '../../utils/colors';

/**
 * @class SetViewModalNewCard
 * @description Create the modal to add a new card on set view
 */
class SetViewModalNewCard extends PureComponent {
  static propTypes = {
    addCardToSet: PropTypes.func.isRequired,
    setId: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    toggleModalNewCard: PropTypes.func.isRequired,
  }

  state = {
    frontCardText: 'Write a question',
    backCardText: 'Write an answer',
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

    return (
      <ModalWrapper onCancel={this.onCancelModal} onClose={this.onCloseModal} visible>
        <ModalInput
          inputValue={frontCardText}
          label="FRONT CARD TEXT"
          onChange={this.onChangeFrontText}
          themeColor={themeColor}
        />
        <ModalInput
          inputValue={backCardText}
          label="BACK CARD TEXT"
          onChange={this.onChangeBackText}
          themeColor={themeColor}
        />
      </ModalWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCardToSet: (setId, cardId, card) => {
    dispatch(createCards(card));
    dispatch(addNewCardToSet(setId, cardId));
  },
});

const connector = connect(null, mapDispatchToProps);
export default connector(SetViewModalNewCard);
