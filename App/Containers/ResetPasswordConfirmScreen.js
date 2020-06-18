import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Container, Content } from 'native-base'
import I18n from '../I18n'
import styles from './Styles/ResetPasswordConfirmScreenStyles'
import {CustomButton} from 'customsoft-package'

class ResetPasswordConfirmScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      changePassword: props.changePassword,
      navigation: props.navigation,
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      title: 'Reset password',
      rightElement: false,
      backToMenu: false,
      previous: {},
      showBackButton: true,
      whiteHeader: false,
    });
  }

  handleResponseAction = () => {
    if(this.props.route.params.action === 'login') {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('ForgotPassword');
    }
  };

  render () {
    let action = this.props.route.params.action;

    return (
      <Container style={styles.container}>
        <Content padder>
          <View style={styles.containerStyle}>
            <Text style={styles.message}>{this.props.route.params.message}</Text>

            <CustomButton
              btnStyle={styles.buttonSubmit}
              textStyle={styles.buttonSubmitText}
              btnWidth={120}
              btnHeight={60}
              btnBorderWidth={0}
              text={(action === 'login' ? I18n.t('login') : I18n.t('close'))}

              onPress={this.handleResponseAction}
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordConfirmScreen)
