import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppTabs from './AppTabs';
import NavHeader from "../Components/NavHeader";
const Stack = createStackNavigator();


let screenOptions = {
  animationEnabled: false,
  headerMode      : "none",
  header          : ({scene, previous, navigation}) => {
    const {options} = scene.descriptor;

    const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
    const prev = options.previous === undefined || options.previous === false
      ? null
      : previous;

    return (
      <NavHeader
        title = {title}
        previous = {prev}
        scene = {scene}
        navigation = {navigation}
      />
    );
  },
};

export default class AppStack extends Component {
  render() {
    return (
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="App" component={AppTabs} options={screenOptions}/>
      </Stack.Navigator>
    );
  }
}
