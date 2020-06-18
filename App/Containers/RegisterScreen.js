import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
// Styles
import NavHeader from '../Components/NavHeader';
import RegisterForm from '../Components/RegisterForm';
import RegisterActions, {RegisterSelectors} from '../Redux/RegisterRedux';
import SocialRegisterActions from '../Redux/SocialRegisterRedux';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../I18n';
import ScreenSubHeader from '../Components/ScreenSubHeader';
import SignUpTitle from '../Images/svgs/sign-up.svg';
import {CustomModal} from 'customsoft-package';
import Colors from "../Themes/Colors";

class RegisterScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleTermsModal: false,
      visiblePolicyModal: false,
    };
  }

  componentDidMount() {

    const {navigation} = this.props;

    navigation.setOptions({
      handleNext: () => navigation.navigate('Login'),
      headerTitle: null,
      previous: false
    });
  }

  closeModal = modal => {
    if (modal === 'terms') {
      this.setState({visibleTermsModal: false});
    } else {
      this.setState({visiblePolicyModal: false});
    }
  };
  render() {
    return (
      <Container>
          <Content padder>
            <ScreenSubHeader
              title={I18n.t('header_signup_title')}
              description={I18n.t('header_signup_description')}
            />
            <RegisterForm
              register={this.props.register}
              socialRegister={this.props.socialRegister}
              fetching={this.props.fetching}
              apiError={this.props.error}
              onViewTermsModal={() => {
                this.setState({visibleTermsModal: true});
              }}
              onViewPolicyModal={() => {
                this.setState({visiblePolicyModal: true});
              }}
            />
            <CustomModal
              containerStyles={{backgroundColor: 'white'}}
              textStyles={{
                fontWeight: 'normal',
                fontFamily: 'NunitoSans-Regular',
              }}
              title={I18n.t('terms_and_conditions')}
              isVisible={this.state.visibleTermsModal}
              dismissHandler={() => this.closeModal('terms')}>
              <View style={{padding: 20}}>
                <Text style={{paddingBottom: 10}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </View>
            </CustomModal>
            <CustomModal
              containerStyles={{backgroundColor: 'white'}}
              textStyles={{
                fontWeight: 'normal',
                fontFamily: 'NunitoSans-Regular',
              }}
              title={I18n.t('privacy_policy')}
              isVisible={this.state.visiblePolicyModal}
              dismissHandler={() => this.closeModal('policy')}>
              <View style={{padding: 20}}>
                <Text style={{paddingBottom: 10}}>
                  Ac turpis egestas integer eget. Dis parturient montes nascetur
                  ridiculus mus mauris vitae ultricies. Facilisis volutpat est
                  velit egestas dui. Id nibh tortor id aliquet lectus proin
                  nibh. Leo duis ut diam quam nulla porttitor. Arcu non odio
                  euismod lacinia at quis. Tempus imperdiet nulla malesuada
                  pellentesque elit eget gravida cum. Pellentesque diam volutpat
                  commodo sed egestas egestas fringilla.
                </Text>
              </View>
            </CustomModal>
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: RegisterSelectors.fetching(state),
    error: (state.register.error ? state.register.payload : false),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: data => dispatch(RegisterActions.registerRequest(data)),
    socialRegister: data =>
      dispatch(SocialRegisterActions.socialRegisterRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
