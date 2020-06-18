import React, {Component} from 'react';
import {connect} from 'react-redux';
import ResetPasswordActions from '../Redux/ResetPasswordRedux';
import ForgotPasswordForm from '../Components/ForgotPasswordForm';
import {Container, Content} from 'native-base';
import LinearGradient from "react-native-linear-gradient";
import Colors from "../Themes/Colors";
import I18n from "../I18n";
import ScreenSubHeader from "../Components/ScreenSubHeader";

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {

    const {navigation} = this.props;

    navigation.setOptions({
      previous: true,
      showBackButton: true,
      rightElement: false,
      headerTitle: 'Forgot password'
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const {error, fetching, forgotPassword} = this.props;
    return (
      <Container>
        <Content padder>
          <ScreenSubHeader
            title={null}
            description={I18n.t('header_reset_password_description')}
          />
          <ForgotPasswordForm
            resetPassword={forgotPassword}
            fetching={fetching}
            apiError={error}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.resetPassword.fetching,
    error: (state.resetPassword.error ? state.resetPassword.payload : false),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: email =>
      dispatch(ResetPasswordActions.resetPasswordRequest({email})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
