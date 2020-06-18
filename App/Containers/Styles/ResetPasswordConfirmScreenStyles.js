import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: Metrics.doubleBaseMargin,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  center: {
    alignItems: 'center'
  },
  message: {
    color: Colors.darkText,
    fontFamily: Metrics.baseFontFamily,
    fontSize: 17,
    paddingTop: 56,
    paddingBottom: 64,
    textAlign: 'center'
  },
  buttonSubmit:{
    backgroundColor: Colors.background,
    borderColor: Colors.background
  },
  buttonSubmitText: {
    marginTop: 15,
    fontSize: 18
  }


});
