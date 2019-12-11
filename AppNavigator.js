import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Notes from './Home';
import Input from './Input';
import Stats from './Stats';
import Calendar from './CalendarView'
import Auth from './Auth';



const AppNavigator = createMaterialTopTabNavigator(
  {
    Input: {screen: Input},
    Calendar: {screen: Calendar},
    Stats: {screen: Stats},
    ' ': { screen: Notes},


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
