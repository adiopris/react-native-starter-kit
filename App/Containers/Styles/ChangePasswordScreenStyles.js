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
    borderTopLeftRadius: Metrics.doubleBorderRadius,
    borderTopRightRadius: Metrics.doubleBorderRadius,
    paddingHorizontal: Metrics.basePadding,
    minHeight: Metrics.screenHeight - Metrics.navBarHeight - 100,
  },
  containerForm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center'
  }


});
