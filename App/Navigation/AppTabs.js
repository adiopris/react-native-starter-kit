import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Colors, Metrics } from '../Themes'
import DemoNav from "./DemoNav";

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
          name="Tab1"
          component={DemoNav}
          options={{title: 'Tab 1'}}
        />
        <Tab.Screen
          name="Tab2"
          component={DemoNav}
          options={{title: 'Tab 2'}}
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
