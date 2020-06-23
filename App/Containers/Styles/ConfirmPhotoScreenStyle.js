import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    width: '30%',
    height: 50,
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    paddingTop: 15
  },
  closeButton:{
    width: '30%',
    height: 35,
    // marginTop: 200,
    backgroundColor: Colors.charcoal,
    borderColor: Colors.charcoal,
    alignSelf: 'center',
    paddingTop: 15
  },
  previewPhotoBox:{
    width: '100%',
    marginTop: 0
  },
  photo:{
    width: '95%',
    height: '50%',
    marginLeft: 10,
    marginRight: 10,
  },

  fullPhotoBox:{
    width: '100%',
    marginTop: 0,
    marginBottom: 30
  },
  photoFull:{
    height: '75%',
    marginTop: 100,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0
  },

  actionsRow:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
})
