import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Home from './Home';
import Input from './Input';
import Stats from './Stats';


const AppNavigator = createMaterialTopTabNavigator(
  {
    Input: {screen: Input},
    Home: { screen: Home },
    Stats: {screen: Stats},

  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      tabStyle: {
        backgroundColor: '#CE9DD9'
      }
    }
  }
);


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;
