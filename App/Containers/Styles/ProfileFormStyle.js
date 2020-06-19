import {StyleSheet} from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.darkBackground,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    paddingTop: 15
  },
  containerWhite: {
    backgroundColor: 'white',
    borderTopLeftRadius: Metrics.formBorderRadius,
    borderTopRightRadius: Metrics.formBorderRadius,
    paddingTop: Metrics.formLargePaddingTop,
  },
  submitButton: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center'
  },
  labelDatePicker:{
    paddingTop: 10,
    color: Colors.textMuted,
    fontFamily:'NunitoSans-Regular',
    fontSize: 15,
    marginLeft: -7
  },
  dateTimeContainer:{
    padding: 0,
    paddingLeft: 0,
    marginLeft: 15,
    height: 52,
    width: '93%'
  },
  dateTimeBorderBottom:{
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder
  },
  dateTimeInputPadding:{
    paddingTop:0
  },
  mt12: {
    marginTop: 12,
  }
});
