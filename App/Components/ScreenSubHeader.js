import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './Styles/ScreenSubHeaderStyle';
import GradientText from "./GradientText";
import Colors from '../Themes/Colors';

export default class ScreenSubHeader extends Component {
  // Prop type warnings
  static propTypes = {
    title      : PropTypes.any,
    description: PropTypes.any,
  };

  renderTitle = () => {
    const {title} = this.props;
    if (title) {
      return <GradientText
        colorStart = {Colors.darkText}
        colorEnd = {Colors.darkText}
        startX = {0}
        startY = {0}
        endX = {0.3}
        endY = {1.2}
        style = {styles.headerTitle}
      >
        {title}
      </GradientText>
    }
  };

  renderDescription = () => {
    const {description} = this.props;
    if (description) {
      return <Text style = {styles.headerDescription}>{description}</Text>;
    }
  };

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.headerBox}>
          {this.renderTitle()}
          {this.renderDescription()}
        </View>
      </View>
    );
  }
}
