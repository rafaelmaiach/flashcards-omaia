import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SetView from '../SetView/SetView';
import QuizView from '../QuizView/QuizView';
import NewSetScreen from '../NewSet/NewSetScreen';

const screens = {
  HomeScreen,
  SetView,
  QuizView,
  NewSetScreen,
};

const options = {
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
};

const homeNavigator = createStackNavigator(screens, options);

export default homeNavigator;
