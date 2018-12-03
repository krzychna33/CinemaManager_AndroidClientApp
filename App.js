import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import {Provider} from 'react-redux';

import WelcomeScreen from './src/components/WelcomeScreen';
import ShowingsScreen from './src/components/ShowingsScreen';
import configureStore from './src/store/configureStore';
import ShowingView from './src/components/ShowingView';
import ReservationConfirm from './src/components/ReservationConfirm';
import SuccessScreen from './src/components/SuccessScreen';

console.log(process.env.TEST);
console.log('RUNNING NATIVE APP...')

const store = configureStore();


const MainAppNavigator = createStackNavigator({
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

const RootAppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainAppNavigator
    },
    SuccessScreen: {
      screen: SuccessScreen
    }
  },
    {
      mode: 'modal',
      headerMode: 'none',
    }
);


const AppContainer = createAppContainer(RootAppNavigator);

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

