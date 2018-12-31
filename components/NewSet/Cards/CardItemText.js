import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, StyleSheet, TouchableOpacity, Text, TextInput,
} from 'react-native';
import ModalWrapper from '../../Common/ModalWrapper';
import { editCardText } from '../../../actions/newSet';

import {
  $white, $black, $lightBlue, $lightRed, $darkGreen,
} from '../../../utils/colors';

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
      <ModalWrapper onCancel={this.onCancelModal} visible>
        <View style={styles.modalContent}>
          <Text style={styles.editSetTitle}>{titleText}</Text>
          <TextInput
            maxLength={75}
            onChangeText={this.onChangeText}
            style={styles.modalInput}
            value={cardText}
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
      </ModalWrapper>
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
  changeCardText: (id, text, type) => dispatch(editCardText(id, text, type)),
});

const connector = connect(null, mapDispatchToProps);
export default connector(CardItemText);
