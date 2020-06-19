import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView, Alert } from 'react-native'
import { Container, Content } from 'native-base'
import I18n from '../I18n'
import styles from './Styles/ResetPasswordScreenStyles'
import ResetPasswordActions from '../Redux/ResetPasswordRedux'
import * as Yup from 'yup'
import {CustomPassword, CustomButton} from 'customsoft-package';
import { Formik } from 'formik'
import Colors from '../Themes/Colors'
import ScreenSubHeader from "../Components/ScreenSubHeader";

const FormValidationSchema = Yup.object().shape({
  new_password       : Yup.string().min(5, I18n.t('passwordError')).required(I18n.t('newPasswordRequired')),
  repeat_new_password: Yup.string().required().label(I18n.t('repeat_password'))
    .test('password-match', I18n.t('repeatPasswordNotMatch'), function(value){
      return this.parent.new_password === value;
    })
});

class ResetPasswordScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      new_password: '',
      repeat_new_password: '',
      showConfirmation: false,
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      title: 'Reset password',
      previous: {},
      backToMenu: false,
      rightElement: false,
      showBackButton: true,
      whiteHeader: false
    });

    this.alertImportMissingToken();
  }

  alertImportMissingToken = () => {
    if(!('token' in this.props.route.params)){
      Alert.alert(I18n.t('request_new_reset_password'), I18n.t('missing_reset_password_token'));
      return false;
    }
  };

  handlePasswordChange = (data) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.resetPassword({...data, token: this.props.route.params.token})
        resolve(true)
      }, 1000)
    })
  };

  render () {
    let specialCharactersText = `- Special characters (~!@#$%^&*_-+=\`|\\(){}[]:;"'<>,.?/)`;
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{
            backgroundColor: Colors.topBarBg,
            padding: 10,
            paddingTop: 50
          }}>
            <ScreenSubHeader
              description={'Enter your personal data below to log in'}
            />
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.containerStyle}>
              <Formik
                initialValues={{
                  new_password: '',
                  repeat_new_password: ''
                }}
                validationSchema={FormValidationSchema}
                onSubmit={(values, actions) =>
                  this.handlePasswordChange(values)
                    .then(() => {})
                    .catch(error => {actions.setFieldError('general', error.message)})
                    .finally(() => {actions.setSubmitting(false)}
                    )
                }>
                {props => {
                  return (
                    <View style={styles.containerForm}>
                      <View>
                        <CustomPassword
                          placeholder={I18n.t('new_password')}
                          value={props.values.new_password}
                          secureTextEntry
                          onChangeText={props.handleChange('new_password')}
                          onBlur={props.handleBlur('new_password')}
                          withInlineErrors={props.touched.new_password}
                          errors={[props.errors.new_password]}
                          style={styles.input}
                        />
                        <CustomPassword
                          placeholder={I18n.t('repeat_password')}
                          value={props.values.repeat_new_password}
                          secureTextEntry
                          onChangeText={props.handleChange('repeat_new_password')}
                          onBlur={props.handleBlur('repeat_new_password')}
                          withInlineErrors={props.touched.repeat_new_password}
                          errors={[props.errors.repeat_new_password]}
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.textPasswordConstraintsBox}>
                          <Text style={[styles.mb15, styles.constraintsItem]}>Passwords must be at least 5 characters long.</Text>
                          <Text style={[styles.mb15, styles.constraintsItem]}>The password must contain at least three character categories among the following:</Text>
                          <Text style={styles.constraintsItem}>- Uppercase characters (A-Z)</Text>
                          <Text style={styles.constraintsItem}>- Lowercase characters (a-z)</Text>
                          <Text style={styles.constraintsItem}>- Digits (0-9)</Text>
                          <Text style={styles.constraintsItem}>{specialCharactersText}</Text>
                      </View>
                      <View style={styles.pullRight}>
                        <CustomButton
                          btnStyle={styles.buttonSubmit}
                          textStyle={styles.buttonSubmitText}
                          btnWidth={130}
                          btnHeight={55}
                          btnBorderWidth={0}
                          btnBorderTopLeftRadius={20}
                          btnBorderTopRightRadius={0}
                          btnBorderBottomLeftRadius={0}
                          btnBorderBottomRightRadius={20}
                          btnBgColor={Colors.greenButton}
                          text={I18n.t('submit')} block onPress={props.handleSubmit}/>
                      </View>
                    </View>
                  )
                }}
              </Formik>
            </KeyboardAvoidingView>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  resetPassword: data =>
    dispatch(ResetPasswordActions.saveNewPasswordRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordScreen)
