import React from 'react';
import {View, Text} from 'react-native';
import _ from 'lodash';
import styles from './Styles/FormErrorsStyles';
import PropTypes from 'prop-types';

export default class FormErrors extends React.Component {
  render() {
    let errors = _.compact(_.values(this.props.errors));
    if (!errors.length) {
      return null;
    }

    let joinedErrors = '';
    _.map(this.props.errors, error => {
      if (error) {
        joinedErrors += `${error}\n`;
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{joinedErrors}</Text>
      </View>
    );
  }
}
FormErrors.propTypes = {
  errors: PropTypes.any,
};
FormErrors.defaultProps = {
  errors: {},
};
