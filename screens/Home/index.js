import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import NewSetScreen from '../NewSet/NewSetScreen';
import NewFolderScreen from '../NewFolder/NewFolderScreen';

const screens = {
  HomeScreen,
  NewSetScreen,
  NewFolderScreen,
};

const options = {
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
};

const homeNavigator = createStackNavigator(screens, options);

export default homeNavigator;
