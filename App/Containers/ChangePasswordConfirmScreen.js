import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Container, Content } from 'native-base'
import I18n from '../I18n'
import styles from './Styles/ChangePasswordConfirmScreenStyles'
import UserActions from '../Redux/UserRedux'
import Colors from '../Themes/Colors'
import { Metrics } from '../Themes'
import {CustomButton} from 'customsoft-package'

class ChangePasswordConfirmScreen extends Component {
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
      title: 'Password changed',
      backToMenu: true,
      showBackButton: false,
      whiteHeader: true
    });
  }

  handleResponseAction = () => {
    if (this.state.changePassword.success) {
      this.props.logout()
    } else {
      this.state.navigation.goBack()
    }
  }

  render () {
    return (
      <Container>
        <Content padder>
          <View style={styles.containerStyle}>
            <Text style={styles.message}>{this.state.changePassword.message}</Text>

            <CustomButton
              btnBgColor={Colors.darkButton}
              btnWidth={Metrics.screenWidth - Metrics.doubleBaseMargin}
              btnBorderWidth={0}
              text={I18n.t('close')}
              block
              onPress={this.handleResponseAction}/>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    changePassword: state.changePassword.payload,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.userLogout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordConfirmScreen)
