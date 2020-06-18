import React, {Component} from 'react';
import LoginScreen from '../Containers/LoginScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen';
import ResetPasswordScreen from '../Containers/ResetPasswordScreen';
import ResetPasswordConfirmScreen from "../Containers/ResetPasswordConfirmScreen";
import ChangePasswordScreen from "../Containers/ChangePasswordScreen";
import ChangePasswordConfirmScreen from "../Containers/ChangePasswordConfirmScreen";
import {createStackNavigator} from '@react-navigation/stack';
import NavHeader from '../Components/NavHeader';
const Stack = createStackNavigator();
import I18n from "../I18n";

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
export default class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name = "Login"
          component = {LoginScreen}
          options = {screenOptions}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{...screenOptions, headerTitle: 'Forgot password'}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{...screenOptions, headerTitle: 'Reset password'}}
        />
        <Stack.Screen name = "ResetPasswordConfirm"
                      component = {ResetPasswordConfirmScreen}
                      options = {{...screenOptions, headerTitle: 'Reset password'}}
        />
        <Stack.Screen name = "ChangePassword" component = {ChangePasswordScreen} />
        <Stack.Screen name = "ChangePasswordConfirm" component = {ChangePasswordConfirmScreen} />
        <Stack.Screen name = "Register" component = {RegisterScreen} options = {screenOptions} />
      </Stack.Navigator>
    );
  }
}
