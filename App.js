import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Expo from 'expo';
import { MapView } from 'expo';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
const MyApp = StackNavigator({
  Home: {screen: HomeScreen},
  Maps: {screen: MapScreen}
});
export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
