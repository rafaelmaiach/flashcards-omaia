import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalWrapper from '../../Common/ModalWrapper';
import ModalInput from '../../Common/ModalInput';

import { editCardText } from '../../../actions/newSet';

/**
 * @class CardItemText
 * @description Create the modal to change the card text
 */
class CardItemText extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    cardSide: PropTypes.string.isRequired,
    changeCardText: PropTypes.func.isRequired,
    frontText: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    toggleModalText: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { frontText, backText, cardSide } = props;

    this.state = {
      cardText: cardSide === 'front' ? frontText : backText,
    };
  }

  onCloseModal = () => {
    const { cardText } = this.state;
    const {
      cardId,
      cardSide,
      toggleModalText,
      changeCardText,
    } = this.props;

    const sideType = cardSide === 'front' ? 'frontText' : 'backText';
    changeCardText(cardId, cardText, sideType);

    toggleModalText();
  }

  onCancelModal = () => {
    const { toggleModalText } = this.props;
    toggleModalText();
  }

  onChangeText = cardText => this.setState(() => ({ cardText }));

  render() {
    const { cardText } = this.state;
    const { cardSide, themeColor } = this.props;

    const titleText = cardSide === 'front' ? 'EDIT FRONT CARD TEXT' : 'EDIT BACK CARD TEXT';

    return (
      <ModalWrapper onCancel={this.onCancelModal} onClose={this.onCloseModal} visible>
        <ModalInput
          inputValue={cardText}
          label={titleText}
          onChange={this.onChangeText}
          themeColor={themeColor}
        />
      </ModalWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCardText: (id, text, type) => dispatch(editCardText(id, text, type)),
});

const connector = connect(null, mapDispatchToProps);
export default connector(CardItemText);
