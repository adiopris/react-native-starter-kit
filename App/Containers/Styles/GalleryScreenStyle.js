import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  button:{
    width: '48%',
    height: 50,
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    alignSelf: 'center',
    paddingTop: 15
  },
  closeButton:{
    width: '30%',
    height: 35,
    marginTop: 200,
    backgroundColor: Colors.charcoal,
    borderColor: Colors.charcoal,
    alignSelf: 'center',
    paddingTop: 15
  },
  cameraInput:{
    backgroundColor: Colors.cameraBackground,
    borderRadius: 10,
    padding: 15
  }
})
