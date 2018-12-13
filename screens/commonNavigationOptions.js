import { Platform } from 'react-native';
import { Constants } from 'expo';
import { $darkBlue, $white } from '../utils/colors';

const commonNavigationOptions = () => {
  const height = Platform.OS === 'ios' ? 10 : 30;
  const margin = Platform.OS === 'ios' ? 10 : 0;

  return ({
    title: 'Home',
    headerStyle: {
      height,
      backgroundColor: $darkBlue,
    },
    headerTitleStyle: {
      marginTop: -Constants.statusBarHeight + margin,
    },
    headerTintColor: $white,
  });
};

export default commonNavigationOptions;
