/**
 * App.js
 *
 * Root component of the app, 
 * responsible for setting up routes.
 *
*/

// Libs
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import Home from './screens/HomeScreen';
import Channel from './screens/ChannelScreen';
import Video from './screens/VideoScreen'



/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
const Navigator = createStackNavigator({
    Home: { screen: Home},
    Channel: { screen: Channel },
    Video: { screen: Video },
},
{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
);

/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
*/
const App = createAppContainer(Navigator);

export default App;