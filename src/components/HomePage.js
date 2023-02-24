import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';


import WebBro from '../WebBrowser';
import SenderLoc from './Sender';
import ReceiverAddr from './Receiver';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SenderLoc" component={SenderLoc} />
      <Stack.Screen name="ReceiverAddr" component={ReceiverAddr} />
    </Stack.Navigator>
  );
}



const HomePage = () => {
  return (
    <>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
     
    </>
  );
};

export default HomePage;
