import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import UserActions from '../Redux/UserRedux';
import * as Yup from 'yup';
import I18n from '../I18n';
import {Formik} from 'formik';
import moment from 'moment';
import ProfileFormStyle from './Styles/ProfileFormStyle';
import {
  CustomInputWithLabel,
  CustomDropDownAlt,
  CustomButtonLarge, CustomPhone
} from 'customsoft-package';
import CustomDateTimePicker from 'customsoft-package/elements/CustomDateTime'
import {Colors, Metrics} from '../Themes';
import ProfileActions from '../Redux/ProfileRedux';

// Styles
import styles from './Styles/ProfileScreenStyles'

const FormValidationSchema = Yup.object().shape({

  first_name: Yup.string().required('First Name is Required'),
  last_name: Yup.string().required('Last Name is Required'),
  email: Yup.string().required('Email is Required'),
  date_of_birth: Yup.string().required('Date of Birth Required'),
  country: Yup.string().required('Country is Required'),
});

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  saveProfile = (data) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {

        this.props.saveProfile({data});
        resolve(true)
      }, 2000)
    })

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerTitle: I18n.t('Profile'),
      previous: false,
      showBackButton: false,
      closeMenuIcon: true,
    });
  }

  render () {
    const user_data = this.props.profile;

    return (
      <KeyboardAvoidingView
        style={{
          flex:1,
        }}
        behaviour="padding">
        <Formik
          initialValues={{
            phone_number: user_data.phone_number ?? '',
            phone_prefix: user_data.phone_prefix ?? '',
            email: user_data.email ?? '',
            first_name: user_data.first_name ?? '',
            last_name: user_data.last_name ?? '',
            country: user_data.country ?? '',
            gender: user_data.gender ?? '',
            date_of_birth: user_data.date_of_birth ? user_data.date_of_birth : moment().subtract(18, 'y')
          }}
          validationSchema={FormValidationSchema}
          onSubmit={(values, actions) =>
            this.saveProfile(values)
              .then(() => {

              })
              .catch(error => {
                actions.setFieldError('general', error.message)
              })
              .finally(() => {
                actions.setSubmitting(false)
              })
          }
        >
          {props => {
            return (
              <View style={ProfileFormStyle.containerWhite}>

                <CustomInputWithLabel
                  label="First name"
                  value={props.values.first_name}
                  onChangeText={props.handleChange('first_name')}
                  onBlur={props.handleBlur('first_name')}
                  withInlineErrors={props.touched.first_name}
                  errors={[props.errors.first_name]}
                />

                <CustomInputWithLabel
                  label="Last name"
                  value={props.values.last_name}
                  onChangeText={props.handleChange('last_name')}
                  onBlur={props.handleBlur('last_name')}
                  withInlineErrors={props.touched.last_name}
                  errors={[props.errors.last_name]}
                />

                <CustomInputWithLabel
                  label="Email"
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  inlineErrors={props.touched.email}
                />

                  <CustomPhone
                    onChangePrefix={props.handleChange('phone_prefix')}
                    onChangeNumber={props.handleChange('phone_number')}
                    prefix={props.values.phone_prefix}
                    number={props.values.phone_number}
                    withInlineErrorsNumber={props.touched.phone_number}
                    withInlineErrorsPrefix={props.touched.phone_prefix}
                  />

                  <CustomDateTimePicker
                    containerStyle={styles.dateTimeContainer}
                    style={[ProfileFormStyle.dateTimeBorderBottom, ProfileFormStyle.dateTimeInputPadding]}
                    labelStyle={styles.labelDatePicker}
                    dateStyle={ProfileFormStyle.mt12}
                    label='Date of birth'
                    value={props.values.date_of_birth}
                    formattedValue={moment(props.values.date_of_birth).format('MM / DD / YYYY')}
                    mode="date"
                    showRightIcon
                    withInlineErrors={props.touched.date_of_birth}
                    errors={[props.errors.date_of_birth]}
                    onChangeDateTime={date => {props.setFieldValue('date_of_birth', date)}}
                    onBlur={props.handleBlur('date_of_birth')}
                  />

                <CustomDropDownAlt
                  label="Country"
                  data={[
                    { id: 1, country: 'Romania' },
                    { id: 2, country: 'Franta' },
                    { id: 3, country: 'Germania' },
                    { id: 4, country: 'Grecia' },
                  ]}
                  keyName="country"
                  keyAsTitle="country"
                  selected={props.values.country}
                  onSelected={item => {
                    props.setFieldValue('country', item.country)
                  }}
                  onBlur={props.handleBlur('country')}
                  withInlineErrors={props.touched.country}
                  errors={[props.errors.country]}
                />

                <CustomDropDownAlt
                  label="Gender"
                  data={[
                    { id: 1, gender: 'Male' },
                    { id: 2, gender: 'Female' },
                  ]}
                  keyName="gender"
                  keyAsTitle="gender"
                  selected={props.values.gender}
                  onSelected={item => {
                    props.setFieldValue('gender', item.gender)
                  }}
                  onBlur={props.handleBlur('gender')}
                  withInlineErrors={props.touched.gender}
                  errors={[props.errors.gender]}
                />


                {props.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style={[styles.forceToBottom, ProfileFormStyle.submitButton, styles.mt20]}>
                    <CustomButtonLarge
                      btnBgColor={Colors.background}
                      btnBorderWidth={0}
                      btnWidth={300}
                      onPress={
                        props.handleSubmit
                      }
                      text={I18n.t('update_profile')}
                    />
                  </View>
                )}
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile  : !state.profile.payload.data ? state.profile.payload : state.profile.payload.data,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(UserActions.userLogout()),
    saveProfile: data => dispatch(ProfileActions.saveProfileRequest(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
