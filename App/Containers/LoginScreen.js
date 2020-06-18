import React, {Component} from 'react';
import {connect} from 'react-redux';
import I18n from '../I18n';
import UserActions from '../Redux/UserRedux';
import SocialLoginActions from '../Redux/SocialLoginRedux';
import LoginForm from '../Components/LoginForm';
import {Container, Content} from 'native-base';
import ScreenSubHeader from "../Components/ScreenSubHeader";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  componentDidMount() {

    const {navigation} = this.props;
    this.props.reset();
    navigation.setOptions({
      handleNext: () => navigation.navigate('Register'),
      headerTitle: null
    });
  }

  renderActivateAccountMessage = () => {
    const {params} = this.props.route;
    let error = null;
    if(params !== undefined && 'needsToBeActivated' in params){
      error = params.needsToBeActivated ? I18n.t('check_email_and_activate_account'): null;
    }
    return error;
  };

  renderSuccessActivationMessage = () => {
    const {params} = this.props.route;
    let message = null;
    if(params !== undefined && 'message' in params){
      message = params.message;
    }
    return message;
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container>
          <Content padder>
            <ScreenSubHeader
              title={I18n.t('header_login_title')}
              description={I18n.t('header_login_description')}
            />

            <LoginForm
              auth={this.props.auth}
              socialLogin={this.props.socialLogin}
              fetching={this.props.fetching}
              message={this.renderSuccessActivationMessage()}
              apiError={this.props.error || this.renderActivateAccountMessage()}
              onForgotPassword={() => navigate('ForgotPassword')}
            />
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    error: (state.user.error ? state.user.payload.error : false),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: data => dispatch(UserActions.userRequest(data)),
    socialLogin: data => dispatch(SocialLoginActions.socialLoginRequest(data)),
    reset: data => dispatch(UserActions.userReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
