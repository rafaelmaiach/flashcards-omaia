import { Platform } from 'react-native';
import { Constants } from 'expo';
import { $darkBlue, $white } from '../utils/colors';

const commonNavigationOptions = {
  headerStyle: {
    height: Platform.OS === 'ios' ? 10 : 30,
    backgroundColor: $darkBlue,
  },
  headerTitleStyle: {
    marginTop: -Constants.statusBarHeight + (Platform.OS === 'ios' ? 10 : 0),
  },
  headerTintColor: $white,
};

export default commonNavigationOptions;
