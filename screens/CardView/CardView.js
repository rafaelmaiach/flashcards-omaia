import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { setStatusBarColor } from '../../actions/statusBar';

import Left from '../../components/NewSet/Left';
import commonNavigationOptions from '../commonNavigationOptions';

class CardView extends PureComponent {
  static propTypes = {
    changeStatusBarColor: PropTypes.func.isRequired,
    set: PropTypes.object.isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    const bgColor = navigation.getParam('backgroundColor');

    return ({
      ...commonNavigationOptions,
      title,
      headerLeft: <Left isCardView navigation={navigation} />,
      headerStyle: {
        ...commonNavigationOptions.headerStyle,
        backgroundColor: bgColor,
      },
    });
  }

  componentDidMount() {
    const { set, changeStatusBarColor } = this.props;
    changeStatusBarColor(set.backgroundColor);
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = ({ sets }, props) => {
  const id = props.navigation.getParam('id');

  return {
    set: sets.byId[id],
  };
};

const mapDispatchToProps = dispatch => ({
  changeStatusBarColor: color => dispatch(setStatusBarColor(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardView);
