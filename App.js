import React from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Components
// import Home from './screens/HomeScreen';
// import Channel from './screens/ChannelScreen';
// import Video from './screens/VideoScreen';
import HomeScreen from './screens/HomeScreen';
import ChannelScreen from './screens/ChannelScreen';
import VideoScreen from './screens/VideoScreen';

const Stack = createStackNavigator();

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
 */
// const Navigator = createStackNavigator(
//   {
//     Home: {screen: Home},
//     Channel: {screen: Channel},
//     Video: {screen: Video},
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     },
//   },
// );

function RootStack() {
  const [inView, setInView] = React.useState(true);
  const [channels, setChannels] = React.useState([]);
  const [items, setItems] = React.useState([
    <ActivityIndicator
      key={0}
      size="large"
      color="lightblue"
      style={{height: '100%', width: 600}}
      contentContainerStyle={{width: 600}}
    />,
  ]);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name="Home" options={{title: 'My app', headerShown: false}}>
        {(props) => (
          <HomeScreen {...props} setInView={setInView} inView={inView} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Channel"
        options={{title: 'My app', headerShown: false}}>
        {(props) => (
          <ChannelScreen
            {...props}
            setInView={setInView}
            inView={inView}
            items={items}
            setItems={setItems}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        initialParams={{user: 'me'}}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

/**
 * NavigationContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
 */
// const App = NavigationContainer(RootStack);

// export default App;

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
