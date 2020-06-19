import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.topBarBg
  },
  content: {
    backgroundColor: Colors.topBarBg,
    paddingTop: Metrics.doubleBaseMargin,
  },
  containerStyle: {
    backgroundColor: Colors.topBarBg,
  },
  containerForm: {
    // flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Metrics.doubleBorderRadius,
    borderTopRightRadius: Metrics.doubleBorderRadius,
    borderBottomLeftRadius: Metrics.doubleBorderRadius,
    borderBottomRightRadius: Metrics.doubleBorderRadius,
    paddingHorizontal: Metrics.basePadding,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center'
  },
  pullRight:{
    alignItems: 'flex-end',
    margin: 0,
    padding: 0
  },
  textPasswordConstraintsBox:{
    marginTop: 10,
    padding: 20,
    marginBottom: 70
  },
  constraintsItem:{
    fontSize: 14,
    fontFamily: Metrics.baseFontFamily
  },
  mb15: {
    marginBottom: 15
  },
  input:{
    height: 65
  },
  buttonSubmit:{
    position:'absolute',
    right: -10,
    bottom: 0,
    backgroundColor: Colors.background,
    borderColor: Colors. background
  },
  buttonSubmitText: {
    marginTop: 15,
    fontSize: 18
  }

});
