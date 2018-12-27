import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CardView from '../CardView/CardView';
import NewSetScreen from '../NewSet/NewSetScreen';

const screens = {
  HomeScreen,
  CardView,
  NewSetScreen,
};

const options = {
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
};

const homeNavigator = createStackNavigator(screens, options);

export default homeNavigator;
