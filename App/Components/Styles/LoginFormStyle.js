import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  formBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer:{
    width: '100%',
    height: 55,
    borderBottomWidth: 0.5,
    paddingLeft: 20,
  },
  input:{
    marginTop: 10,
    paddingLeft: 0,
    fontFamily: Metrics.baseFontFamily,
    fontSize: 18,
    color: Colors.inputText,
  },
  errorBox:{
    marginLeft: 20,
    width: '100%',
  },
  messageBox:{
    marginLeft: 20,
    marginBottom: 20,
    width: '100%',
  },
  generalError: {
    padding: 10,
    color: Colors.error,
  },
  message: {
    padding: 10,
    color: Colors.message,
  },
  spacerXL:{
    height: 40
  },
  submitButtonView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 35,
  },
  socialLoginBox: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLoginText: {
    fontSize: 14,
    fontFamily: Metrics.baseFontFamily,
    color: Colors.darkText,
  },
  resetPasswordBtn: {
    position: 'absolute',
    left: 35,
    bottom: 25,
  },
  resetPasswordText: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: Colors.darkText,
  },
  submitButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    // justifySelf: 'flex-end'
    paddingTop: 15,
    backgroundColor: Colors.background,
    borderColor: Colors.background
  },
});
