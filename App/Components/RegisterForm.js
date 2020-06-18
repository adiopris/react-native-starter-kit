import React, {Component} from 'react';
import {Text} from 'native-base';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import I18n from '../I18n';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Styles/RegisterFormStyle';
import {CustomInput, CustomPassword, CustomButton, CustomPhone, CustomCheckbox} from 'customsoft-package';
import GoogleIcon from '../Images/svgs/google.svg';
import FacebookIcon from '../Images/svgs/facebook.svg';
import FormErrors from './FormErrors';

const FormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid Email.')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .required('Required'),
  password_repeat: Yup.string()
                           .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  terms: Yup.bool().oneOf(
    [true],
    'Terms and Conditions and Privacy Policy must be accepted',
  ),
});

export default class RegisterForm extends Component {
  signIn = async () => {
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
    this.props.socialRegister({
      oauth_client: 'fb',
      token: token.accessToken.toString(),
    });
  };
  handleSubmit = (data, action) => {
    const {name, email, password, password_repeat} = data;
    return new Promise((resolve) => {
      this.props.register({
        name,
        email,
        password,
        password_repeat
      });
      resolve(true);
    });
  };

  renderSocialButtons = () => {
    return (
      <View style={styles.socialLoginBox}>
        <Text style={styles.socialLoginText}>
          {I18n.t('or_create_account_using_social_media')}
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

  renderTermsText = () => {
    const {onViewTermsModal, onViewPolicyModal} = this.props;
    return (
      <View style={styles.termsTextBox}>
        <Text style={styles.termsTextNormal}>I have read and accepted</Text>

        <View style={styles.row}>
          <Text style={styles.termsTextNormal}>the </Text>
          <TouchableOpacity
            onPress={onViewTermsModal}
            style={{flexDirection: 'row'}}>
            <Text style={styles.termsTextHighlight}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.termsTextNormal}>and </Text>
          <TouchableOpacity onPress={onViewPolicyModal}>
            <Text style={styles.termsTextHighlight}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderTermsErrors = (hasErrors, errors) => {
    if (hasErrors) {
      return (
        <View
          style={{
            width: '50%',
            alignSelf: 'flex-start',
            marginTop: -20,
            marginLeft: 40,
            marginBottom: 20
          }}>
          <FormErrors errors={[errors]} />
        </View>
      );
    }
  };

  render() {
    const {apiError} = this.props;
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_repeat: '',
            terms: false,
          }}
          validationSchema={FormValidationSchema}
          onSubmit={(values, actions) =>
            this.handleSubmit({
              name: values.name,
              email: values.email,
              password: values.password,
              password_repeat: values.password_repeat,

            }, actions)
                .finally(() => {
                  actions.setSubmitting(false);
                })
          }>
          {props => {

            return (
              <View style={styles.formBox}>
                <CustomInput
                  placeholder={I18n.t('name')}
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  withInlineErrors={props.touched.name}
                  errors={[props.errors.name]}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                />

                <CustomInput
                  placeholder={I18n.t('email')}
                  value={props.values.email}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  withInlineErrors={props.touched.email}
                  errors={[props.errors.email]}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                />

                <CustomPassword
                  placeholder={I18n.t('password')}
                  value={props.values.password}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  withInlineErrors={props.touched.password}
                  errors={[props.errors.password]}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                />

                <CustomPassword
                  placeholder={I18n.t('password_repeat')}
                  value={props.values.password_repeat}
                  onChangeText={props.handleChange('password_repeat')}
                  onBlur={props.handleBlur('password_repeat')}
                  withInlineErrors={props.touched.password_repeat}
                  errors={[props.errors.password_repeat]}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                />

                {apiError !== false ? (<View style = {styles.errorBox}>
                  <Text style = {styles.generalError}>{apiError}</Text>
                </View>) : null}
                {props.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style = {[styles.submitButtonView, (apiError === false ? {paddingTop:40} : null)]}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <View style={styles.termsCheckboxGroup}>
                        <CustomCheckbox
                          size={26}
                          color="#cecece"
                          labelColor="#767F9B"
                          label=""
                          checked={props.values.terms}
                          onToggle={() =>
                            props.setFieldValue('terms', !props.values.terms)
                          }
                        />
                        {this.renderTermsText()}
                      </View>
                      {this.renderTermsErrors(
                        props.touched.terms,
                        props.errors.terms,
                      )}
                    </View>
                    <CustomButton
                      btnStyle={styles.submitButton}
                      textStyle={styles.submitText}
                      btnWidth={140}
                      btnHeight={70}
                      btnBorderTopLeftRadius={20}
                      btnBorderTopRightRadius={0}
                      btnBorderBottomLeftRadius={0}
                      btnBorderBottomRightRadius={20}
                      onPress={props.handleSubmit}
                      text={I18n.t('create_account')}
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
