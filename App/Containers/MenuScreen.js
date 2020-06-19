import React, {Component} from 'react'
import {connect} from 'react-redux';
import I18n from '../I18n';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native'
import UserActions from '../Redux/UserRedux';

// Styles
import styles from './Styles/MenuScreenStyles'

class MenuScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerTitle: I18n.t('menu'),
      previous: false,
      showBackButton: false,
      closeMenuIcon: true,
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Profile')
            }}>
              <Text>{I18n.t('profile')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.logout()
            }}>
              <Text>{I18n.t('logOut')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(UserActions.userLogout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)
