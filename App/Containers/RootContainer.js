import React, {Component} from 'react';
import {View, StatusBar, Linking} from 'react-native';
import {connect} from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import {NavigationContainer} from '@react-navigation/native';
// Styles
import styles from './Styles/RootContainerStyles';
import {UserSelectors} from '../Redux/UserRedux';
import {navigationRef} from '../Navigation/RootNavigation';
import * as RootNavigation from '../Navigation/RootNavigation';
import AuthStack from '../Navigation/AuthStack';
import AppStack from '../Navigation/AppStack';

class RootContainer extends Component {

  componentDidMount() {
    this.initLinking();
  }

  initLinking = () => {
    Linking.getInitialURL().then(url => {
      if (url) {
        this.navigate(url);
      }
    });
    Linking.addEventListener('url', this.handleOpenURL);
  };

  navigate = url => {
    const urlParts = url.split('/');

    if (urlParts[4].includes('reset-password')) {
      let parts = urlParts[4].split('?');
      let tokenKeyValue = parts[1].split('=');
      RootNavigation.navigate('ResetPassword', {token: tokenKeyValue[1]});
    } else {
      RootNavigation.navigate('Login');
    }
  };

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  render() {
    return (
      <View style = {styles.applicationView}>
        <StatusBar barStyle = "light-content" />
        <NavigationContainer  ref = {navigationRef}>
          {this.props.isGuest ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGuest: UserSelectors.isGuest(state),
  };
};
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});
RootContainer.defaultProps = {
  isGuest: true,
};
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
