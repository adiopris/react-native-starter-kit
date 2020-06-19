import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Colors from "customsoft-package/Themes/Colors";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
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
  },
  dateTimeInputPadding:{
    paddingTop:0
  },
  labelDatePicker:{
    paddingTop: 10,
    color: Colors.textMuted,
    fontFamily:'NunitoSans-Regular',
    fontSize: 15,
    marginLeft: -7
  },
  mt20: {
    marginTop: 20
  }

})
