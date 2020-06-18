import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    flex: 1,
    width: '80%',
    marginBottom: 30,
    paddingLeft: 5,
  },
  headerTitle: {
    fontSize: 36,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.darkText,
  },
  headerDescription: {
    fontSize: 13,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.darkText,
  },
});
