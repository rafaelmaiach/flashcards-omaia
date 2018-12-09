import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home';
import TrashScreen from '../screens/Trash';
import { $white, $lightRed } from '../utils/colors';

const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Flashcards',
    },
  },
  Trash: {
    screen: TrashScreen,
    navigationOptions: {
      title: 'Trash',
    },
  },
};

const navigationOptions = {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: $lightRed,
    },
    headerTintColor: $white,
    headerTitleStyle: {
      letterSpacing: 3,
    },
  },
};

const MainNavigation = createStackNavigator(screens, navigationOptions);

export default createAppContainer(MainNavigation);
