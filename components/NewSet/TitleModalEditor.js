import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import ModalWrapper from '../Common/ModalWrapper';
import ModalInput from '../Common/ModalInput';

import { editTitle } from '../../actions/newSet';

class TitleModalEditor extends PureComponent {
  static defaultProps = {
    themeColor: '',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    submitNewTitle: PropTypes.func.isRequired,
    themeColor: PropTypes.string,
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

  onChangeText = newTitle => this.setState(() => ({ newTitle }));

  onCloseModal = () => {
    const { newTitle } = this.state;
    const { toggleModalTitle, navigation, submitNewTitle } = this.props;

    submitNewTitle(newTitle);
    navigation.setParams({ title: newTitle });

    const animateIcon = navigation.getParam('animateIcon');
    animateIcon('close');

    toggleModalTitle();
  }

  onCancelModal = () => {
    const { toggleModalTitle, navigation } = this.props;
    const animateIcon = navigation.getParam('animateIcon');

    animateIcon('close');
    toggleModalTitle();
  }

  render() {
    const { newTitle } = this.state;
    const { visible, themeColor } = this.props;

    return (
      <ModalWrapper onCancel={this.onCancelModal} onClose={this.onCloseModal} visible={visible}>
        <ModalInput
          inputValue={newTitle}
          label="EDIT TITLE"
          onChange={this.onChangeText}
          themeColor={themeColor}
        />
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ newSet }) => ({
  title: newSet.title,
});

const mapDispatchToProps = dispatch => ({
  submitNewTitle: newTitle => dispatch(editTitle(newTitle)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(withNavigation(TitleModalEditor));
