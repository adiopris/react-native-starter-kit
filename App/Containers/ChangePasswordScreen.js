import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView } from 'react-native'
import { Container, Content } from 'native-base'
import I18n from '../I18n'
import styles from './Styles/ChangePasswordScreenStyles'
import ChangePasswordActions from '../Redux/ChangePasswordRedux'
import * as Yup from 'yup'
import {CustomPassword, CustomButton} from 'customsoft-package';
import { Formik } from 'formik'
import Colors from '../Themes/Colors'
import { Metrics } from '../Themes'

const FormValidationSchema = Yup.object().shape({
  old_password: Yup.string().required(I18n.t('passwordRequired')),
  new_password: Yup.string().min(5, I18n.t('passwordError')).required(I18n.t('newPasswordRequired')),
  repeat_new_password: Yup.string().when('new_password', {
    is: val => (!!(val && val.length > 0)),
    then: Yup.string().oneOf(
      [Yup.ref('new_password')],
      I18n.t('repeatPasswordNotMatch')
    )
  })
})

class ChangePasswordScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      old_password: '',
      new_password: '',
      repeat_new_password: '',
      showConfirmation: false,
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      title: 'Change password',
      backToMenu: true
    });
  }


  handlePasswordChange = (data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        this.props.changePassword(data)
        resolve(true)
      }, 1000)
    })

  render () {
    return (
      <Container>
        <Content>
          <View style={{
            backgroundColor: Colors.darkBackground
          }}>

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.containerStyle}>
              <Formik
                initialValues={{
                  old_password: '',
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
                          placeholder={I18n.t('old_password')}
                          value={props.values.old_password}
                          secureTextEntry
                          onChangeText={props.handleChange('old_password')}
                          onBlur={props.handleBlur('old_password')}
                          withInlineErrors={props.touched.old_password}
                          errors={[props.errors.old_password]}
                        />
                        <CustomPassword
                          placeholder={I18n.t('new_password')}
                          value={props.values.new_password}
                          secureTextEntry
                          onChangeText={props.handleChange('new_password')}
                          onBlur={props.handleBlur('new_password')}
                          withInlineErrors={props.touched.new_password}
                          errors={[props.errors.new_password]}
                        />
                        <CustomPassword
                          placeholder={I18n.t('repeat_new_password')}
                          value={props.values.repeat_new_password}
                          secureTextEntry
                          onChangeText={props.handleChange('repeat_new_password')}
                          onBlur={props.handleBlur('repeat_new_password')}
                          withInlineErrors={props.touched.repeat_new_password}
                          errors={[props.errors.repeat_new_password]}
                        />
                      </View>

                      <View style={styles.center}>
                        <CustomButton
                          btnBgColor={Colors.topBarBg}
                          btnWidth={Metrics.screenWidth - Metrics.doubleBaseMargin}
                          btnBorderWidth={0}
                          text={I18n.t('confirm_change')} block onPress={props.handleSubmit}/>
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
  changePassword: data =>
    dispatch(ChangePasswordActions.changePasswordRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen)
