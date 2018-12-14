import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import NewSetScreen from '../NewSet/NewSetScreen';
import NewFolderScreen from '../NewFolder/NewFolderScreen';

export default createStackNavigator({
  HomeScreen,
  NewSetScreen,
  NewFolderScreen,
});
