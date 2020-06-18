import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view'
import {Colors} from '../Themes';

export default class GradientText extends Component {

  static propTypes = {
    colorStart: PropTypes.string,
    colorEnd: PropTypes.string,
    startX: PropTypes.number,
    startY: PropTypes.number,
    endX: PropTypes.number,
    endY: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    colorStart: 'black',
    colorEnd: 'white',
    startX: 0,
    startY: 0,
    endX: 1,
    endY: 0,
    style: {},
  };

  render() {
    const {
      colorStart,
      colorEnd,
      startX,
      startY,
      endX,
      endY,
      style,
    } = this.props;
    return (
      <MaskedView maskElement={<Text {...this.props} />}>
        <LinearGradient colors={[colorStart, colorEnd]} start={{ x: startX, y: startY }} end={{ x: endX, y: endY }}>
          <Text {...this.props} style={[style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  }
}
