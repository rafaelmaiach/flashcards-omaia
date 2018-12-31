import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, StyleSheet } from 'react-native';

import { $lightBlue, $darkBlue } from '../../utils/colors';

class ModalInput extends PureComponent {
  static defaultProps = {
    themeColor: '',
  }

  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    themeColor: PropTypes.string,
  }

  render() {
    const {
      themeColor, label, inputValue, onChange,
    } = this.props;

    const styleTitle = {
      ...styles.label,
      color: themeColor || $lightBlue,
    };

    const inputStyle = {
      ...styles.input,
      borderColor: themeColor || $lightBlue,
    };

    return (
      <Fragment>
        <Text style={styleTitle}>{label}</Text>
        <TextInput
          maxLength={75}
          onChangeText={onChange}
          style={inputStyle}
          value={inputValue}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: $darkBlue,
    borderBottomWidth: 2,
  },
});

export default ModalInput;
