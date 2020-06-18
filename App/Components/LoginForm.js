import React, {Component} from 'react';
import {Text} from 'native-base';
import {Formik} from 'formik';
import I18n from '../I18n';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import * as Yup from 'yup';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import styles from './Styles/LoginFormStyle';
import {CustomButton, CustomInput, CustomPassword} from 'customsoft-package';
import GoogleIcon from '../Images/svgs/google.svg';
import FacebookIcon from '../Images/svgs/facebook.svg';

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email.')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .required('Required'),
});

export default class LoginForm extends Component {
  handleSubmit = (data, action) => {
    const {email, password} = data;
    return new Promise((resolve) => {
      this.props.auth({
        email,
        password
      });
      resolve(true);
    });
  };

  loginWithGoogle = async () => {
    return true;
  };

  handleGoogle = async () => {
    return true;
  };

  handleFacebook = async () => {
    let loginResult = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (loginResult.isCancelled) {
      return false;
    }
    let token = await AccessToken.getCurrentAccessToken();
    this.props.socialLogin({
      oauth_client: 'fb',
      token: token.accessToken.toString(),
    });
  };
  renderSocialButtons = () => {
    return (
      <View style={styles.socialLoginBox}>
        <Text style={styles.socialLoginText}>
          {I18n.t('or_log_in_using_social_media')}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.handleGoogle}>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity block onPress={this.handleFacebook}>
            <FacebookIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {apiError, message} = this.props;
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={FormValidationSchema}
          onSubmit={(values, actions) =>
            this.handleSubmit({
              email: values.email,
              password: values.password
            }, actions)
                .finally(() => {
                  actions.setSubmitting(false);
                })
          }>
          {props => {
            return (
              <View style={styles.formBox}>
                <CustomInput
                  placeholder={I18n.t('email')}
                  value={props.values.email}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                  withInlineErrors={props.touched.email}
                  errors={[props.errors.email]}
                />

                <CustomPassword
                  placeholder={I18n.t('password')}
                  value={props.values.password}
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                  withInlineErrors={props.touched.password}
                  errors={[props.errors.password]}
                />

                {apiError !== false ? (<View style = {styles.errorBox}>
                  <Text style = {styles.generalError}>{apiError}</Text>
                </View>) : (message !== false ? null : <View style={styles.spacerXL} />) }
                {message !== false ? (<View style = {styles.messageBox}>
                  <Text style = {styles.message}>{message}</Text>
                </View>) : null }

                {props.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style={styles.submitButtonView}>
                    <TouchableOpacity
                      style={styles.resetPasswordBtn}
                      onPress={() => this.props.onForgotPassword()}>
                      <Text style={styles.resetPasswordText}>
                        {I18n.t('forgot_password')}
                      </Text>
                    </TouchableOpacity>

                    <CustomButton
                      btnStyle={styles.submitButton}
                      btnWidth={120}
                      btnHeight={55}
                      btnBorderTopLeftRadius={20}
                      btnBorderTopRightRadius={0}
                      btnBorderBottomLeftRadius={0}
                      btnBorderBottomRightRadius={20}
                      onPress={props.handleSubmit}
                      text={I18n.t('login')}
                    />
                  </View>
                )}
              </View>
            );
          }}
        </Formik>
        {this.renderSocialButtons()}
      </View>
    );
  }
}
