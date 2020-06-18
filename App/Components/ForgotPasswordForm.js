import React, {Component} from 'react';
import {Text} from 'native-base';
import FormErrors from '../Components/FormErrors';
import I18n from '../I18n';
import {ActivityIndicator,  View} from "react-native";
import styles from "./Styles/ForgotPasswordFormStyle";
import {Formik} from "formik";
import {CustomInput, CustomButton} from "customsoft-package";
import * as Yup from "yup";

const FormValidationSchema = Yup.object().shape({
  email: Yup.string()
            .email('Invalid Email.')
            .required('Required'),
});

export default class ForgotPasswordForm extends Component {

  handleSubmit = (data, actions) => {
    return new Promise((resolve) => {
      this.props.resetPassword({
        email: data.email,
      });
      resolve(true);
    });
  };

  render() {
    const {apiError} = this.props;
    return (
      <View style = {styles.container}>
        <Formik
          initialValues = {{
            email: '',
          }}
          validationSchema = {FormValidationSchema}
          onSubmit = {(values, actions) =>
            this.handleSubmit({
              email: values.email,
            }, actions)
                .finally(() => {
                  actions.setSubmitting(false);
                })
          }>
          {props => {

            return (
              <View style = {styles.formBox}>
                <CustomInput
                  placeholder = "Email"
                  value = {props.values.email}
                  onChangeText = {props.handleChange('email')}
                  onBlur = {props.handleBlur('email')}
                  withInlineErrors = {props.touched.email}
                  errors = {[props.errors.email]}
                  style = {styles.input}
                />
                <View style = {styles.spacerXL} />
                {apiError !== false ? (<View style = {styles.errorBox}>
                  <Text style = {styles.generalError}>{apiError}</Text>
                </View>) : null}
                {props.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style = {[styles.submitButtonView, (apiError === false ? {paddingTop:40} : null)]}>
                    <CustomButton
                      btnStyle = {styles.submitButton}
                      textStyle = {styles.submitText}
                      btnWidth = {140}
                      btnHeight = {70}
                      btnBorderTopLeftRadius = {20}
                      btnBorderTopRightRadius = {0}
                      btnBorderBottomLeftRadius = {0}
                      btnBorderBottomRightRadius = {20}
                      onPress = {props.handleSubmit}
                      text = {I18n.t('reset_password')}
                    />
                  </View>
                )}
              </View>
            );
          }
          }
        </Formik>
      </View>
    );
  }
}
