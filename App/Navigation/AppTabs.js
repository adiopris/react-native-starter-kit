import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Colors, Metrics } from '../Themes'
import DemoNav from "./DemoNav";
import CameraNav from "./CameraNav";
import GalleryNav from "./GalleryNav";

const Tab = createBottomTabNavigator();
export default class AppTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return null;
          },
        })}
        tabBarOptions={{
          inactiveTintColor: Colors.darkText,
          activeTintColor: Colors.darkText,
          tabStyle: {marginVertical: 5},
          labelStyle: {
            fontSize: 11,
            fontFamily: 'Arial',
          },
        }}>
        <Tab.Screen
          name="Camera"
          component={CameraNav}
          options={{title: 'Camera'}}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryNav}
          options={{title: 'Galerie'}}
        />
        <Tab.Screen
          name="Tab3"
          component={DemoNav}
          options={{title: 'Tab 3'}}
        />
        <Tab.Screen
          name="Tab4"
          component={DemoNav}
          options={{title: 'Tab 4'}}
        />
      </Tab.Navigator>
    );
  }
}
