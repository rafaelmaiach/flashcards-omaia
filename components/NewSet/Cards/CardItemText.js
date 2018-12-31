import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput } from 'react-native';
import ModalWrapper from '../../Common/ModalWrapper';

import { editCardText } from '../../../actions/newSet';

import { $black, $lightBlue } from '../../../utils/colors';

class CardItemText extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    cardSide: PropTypes.string.isRequired,
    changeCardText: PropTypes.func.isRequired,
    frontText: PropTypes.string.isRequired,
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

  onChangeText = cardText => this.setState({ cardText });

  render() {
    const { cardText } = this.state;
    const { cardSide } = this.props;

    const titleText = cardSide === 'front' ? 'EDIT FRONT CARD TEXT' : 'EDIT BACK CARD TEXT';

    return (
      <ModalWrapper onCancel={this.onCancelModal} onClose={this.onCloseModal} visible>
        <Text style={styles.editSetTitle}>{titleText}</Text>
        <TextInput
          maxLength={75}
          onChangeText={this.onChangeText}
          style={styles.modalInput}
          value={cardText}
        />
      </ModalWrapper>
    );
  }
}

const styles = StyleSheet.create({
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
});

const mapDispatchToProps = dispatch => ({
  changeCardText: (id, text, type) => dispatch(editCardText(id, text, type)),
});

const connector = connect(null, mapDispatchToProps);
export default connector(CardItemText);
