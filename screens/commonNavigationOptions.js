import { Constants } from 'expo';
import { $darkBlue, $white } from '../utils/colors';

const commonNavigationOptions = {
  headerStyle: {
    height: 60,
    backgroundColor: $darkBlue,
    marginTop: -Constants.statusBarHeight,
  },
  headerTitleStyle: {
    letterSpacing: 2,
  },
  headerBackTitleStyle: {
    letterSpacing: 1.5,
    fontSize: 15,
  },
  headerTintColor: $white,
};

export default commonNavigationOptions;
