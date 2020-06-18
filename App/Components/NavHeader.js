import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './Styles/NavHeaderStyle';
import NextIcon from '../Images/svgs/next-arrow.svg';
import Colors from '../Themes/Colors';
import I18n from '../I18n';

/**
 * NavHeader
 * Custom header
 *
 * @property  object  navigation      React native navigation
 * @property  object  previous        Settable as {} to let display back arrow when showBackButton is true
 * @property  string  title           Screen title
 * @property  boolean backToMenu      Display x to close screen and return to Menu
 * @property  boolean showBackButton  Display back arrow
 * @property  function handleNext     This functions is pushed through navigation.setOption and is customizable inside of each Screen component
 */
export default class NavHeader extends Component {
  getOptions = () => {
    return this.props.scene.descriptor.options;
  };

  renderLoginRightElement = (options) => {
    let handleNext = options.handleNext;

    if (!handleNext) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity
          onPress = {() => {
            handleNext()
          }}
          style = {styles.rightHeaderLinkBox}
        >
          <View style = {styles.row}>
            <Text style = {styles.rightHeaderLink}>Sign up </Text>
            <NextIcon style = {styles.nextIcon} />
          </View>
        </TouchableOpacity>

        <Text style = {styles.rightHeaderText}>don’t have an account?</Text>
      </View>
    );
  };

  renderRegisterRightElement = (options) => {
    let handleNext = options.handleNext;

    if (!handleNext) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity
          onPress = {() => {
            handleNext()
          }}
          style = {styles.rightHeaderLinkBox}
        >
          <View style = {styles.row}>
            <Text style = {styles.rightHeaderLink}>Login</Text>
            <NextIcon style = {styles.nextIcon} />
          </View>
        </TouchableOpacity>

        <Text style = {styles.rightHeaderText}>have an account?</Text>

      </View>
    );
  };



  renderRightElement = scene => {
    let options = this.getOptions();

    if(options.rightElement === false){
      return null;
    }

    if (scene.route.name === 'Login') {
      return this.renderLoginRightElement(options);
    } else if (scene.route.name === 'Register') {
      return this.renderRegisterRightElement(options);
    }

    if (options.backToMenu === true) {
      //return this.renderBackToMenuIcon();
    }

    if(options.rightElement === false) {
      return null;
    }

    //return this.renderMenuIcon();


  };

  render() {
    const {navigation, title, previous, scene} = this.props;
    let options = this.getOptions();
    let bgColor = Colors.white;
    let textColor = Colors.text;
    return (
      <View style = {[styles.container, {backgroundColor: bgColor}]}>
        <SafeAreaView style = {styles.header}>
          {previous && options.showBackButton && (
            <TouchableOpacity
              styles = {styles.backButton}
              onPress = {navigation.goBack}>
              <Icon name = "arrow-left" size = {25} style = {[styles.backIcon]} />
            </TouchableOpacity>
          )}
          <View style = {[styles.titleView]}>
            <Text style = {[styles.titleText, {color: textColor}]}>{title}</Text>
          </View>
          {this.renderRightElement(scene)}
        </SafeAreaView>
      </View>
    );
  }
}
NavHeader.propTypes = {
  navigation: PropTypes.object,
  previous  : PropTypes.object,
  title     : PropTypes.string,
  backToMenu : PropTypes.bool,
  showBackButton : PropTypes.bool,
  rightElement: PropTypes.bool
};

NavHeader.defaultProps = {
  backToMenu: false,
  showBackButton: true,
  rightElement: true
}
