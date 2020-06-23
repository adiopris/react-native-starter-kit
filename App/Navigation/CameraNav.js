import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavHeader from '../Components/NavHeader';
import CameraScreen from "../Containers/CameraScreen";
import ConfirmPhotoScreen from "../Containers/ConfirmPhotoScreen";

const Stack = createStackNavigator();

let screenOptions = {
  animationEnabled: false,
  header: ({scene, previous, navigation}) => {
    const {options} = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
      <NavHeader
        title={title}
        previous={previous}
        scene={scene}
        navigation={navigation}
      />
    );
  },
};
export default class CameraNav extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{...screenOptions, headerTitle: 'Camera'}}
        />
        <Stack.Screen
          name="ConfirmPhoto"
          component={ConfirmPhotoScreen}
          options={{...screenOptions, headerTitle: 'Confirm photo'}}
        />
      </Stack.Navigator>
    );
  }
}
