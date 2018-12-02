import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import {Provider} from 'react-redux';

import WelcomeScreen from './src/components/WelcomeScreen';
import ShowingsScreen from './src/components/ShowingsScreen';
import configureStore from './src/store/configureStore';
import ShowingView from './src/components/ShowingView';
import ReservationConfirm from './src/components/ReservationConfirm';

console.log(process.env.TEST);
console.log('RUNNING NATIVE APP...')

const store = configureStore();


const AppNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen
  },
  ShowingsScreen: {
    screen: ShowingsScreen
  },
  ShowingView: {
    screen: ShowingView
  },
  ReservationConfirm: {
    screen: ReservationConfirm
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

