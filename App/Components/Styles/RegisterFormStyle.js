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
    paddingTop: 18,
  },
  row: {
    flexDirection: 'row',
  },
  errorBox:{
    marginLeft: 20,
    marginBottom: 20,
    width: '100%',
  },
  generalError: {
    padding: 10,
    color: Colors.error,
  },
  inputContainer:{
    width: '100%',
    height: 55,
    borderBottomWidth: 0.6,
    paddingLeft: 20,
    borderBottomColor: Colors.grayBorder,
    marginTop:5,
  },
  input: {
    marginTop: 10,
    paddingLeft: 0,
    fontFamily: Metrics.baseFontFamily,
    fontSize: 18,
    color: Colors.darkText,
  },
  submitButtonView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 30,
  },
  termsCheckboxGroup: {
    width: '70%',
    flexDirection: 'row',
    marginTop: -20,
    marginBottom: 40,
  },
  termsTextBox: {
    width: '60%',
  },
  termsTextNormal: {
    fontSize: 12,
  },
  termsTextHighlight: {
    fontSize: 12,
    color: Colors.darkText,
  },

  socialLoginBox: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLoginText: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: Colors.darkText,
  },
  submitButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10,
    paddingTop: 25,
    backgroundColor: Colors.background,
    borderColor: Colors.background
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18
  },
  col80: {
    width: '70%',
    flexDirection: 'row',
  },
  col20: {
    width: '30%',
    flexDirection: 'row',
  },
  left: {
    backgroundColor: 'red',
    paddingLeft: 30,
  },
  right: {
    backgroundColor: 'green',
  },
});
