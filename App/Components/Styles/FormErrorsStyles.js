import {StyleSheet} from 'react-native';

import Colors from '../../Themes/Colors';
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: -Metrics.inputHight/2,
  },
  error: {
    textAlign: 'right',
    fontSize: 12,
    color: Colors.error,
  },
});
