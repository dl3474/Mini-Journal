import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Notes from './Home';
import Input from './Input';
import Stats from './Stats';


const AppNavigator = createMaterialTopTabNavigator(
  {
    Input: {screen: Input},
    Notes: { screen: Notes },
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
