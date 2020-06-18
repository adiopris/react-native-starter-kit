import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.topBarBg,
    paddingTop: Metrics.doubleBaseMargin,
  },
  containerStyle: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center'
  },
  message: {
    color: Colors.grayText,
    fontFamily: Metrics.baseFontFamily,
    fontSize: 16,
    paddingTop: 56,
    paddingBottom: 64,
  }


});
