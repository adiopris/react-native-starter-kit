import { StyleSheet } from 'react-native'
import {Colors} from "../../Themes";

export default StyleSheet.create({

  container: {
  flex: 1,
  },
  formBox: {
    alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingTop: 18,
  },
  spacerXL: {
    height: 55
  },
  row: {
    flexDirection: 'row',
  },
  errorBox:{
    marginTop: -45,
    marginLeft: -150,
    marginBottom: 20,
    width: '60%',
  },
  generalError: {
    padding: 10,
    color: Colors.error,
  },
  input: {
    width: '100%',
    fontSize: 20,
    borderBottomWidth: 0.5
  },
  submitButtonView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 30,
  },
  submitButton: {
    position: 'absolute',
      right: 0,
      bottom: 0,
      padding: 10,
      paddingTop: 20,
    backgroundColor: Colors.background,
    borderColor: Colors.background
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18
  },

})
