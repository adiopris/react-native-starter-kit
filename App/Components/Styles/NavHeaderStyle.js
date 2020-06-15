import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

const textColor = Colors.violetTextAndLines;
export default StyleSheet.create({
  container: {
    height: 70,
  },
  header: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleView: {
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  backIcon: {
    fontSize: 15,
    color: textColor,
  },
  row: {
    flexDirection: 'row',
  },
  rightHeaderLinkBox:{
    alignItems: 'flex-end'
  },
  rightHeaderLink:{
    fontSize: 20,
    color: Colors.blueText
  },
  nextIcon:{
    marginTop:10
  },
  rightHeaderText:{
    marginRight: 25,
    color: Colors.blueText,
    fontSize: 16,
  }
});
