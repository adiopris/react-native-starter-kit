'use strict';
import React, {PureComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './Styles/CameraStyle';
import PropTypes from 'prop-types';
import {RNCamera} from 'react-native-camera';

export default class Camera extends PureComponent {
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <RNCamera
          captureAudio={false}
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
          {this.renderCloseButton()}
        </View>
      </View>
    );
  }

  renderCloseButton = () => {
    if(this.props.displayCloseButton){
      return (
        <TouchableOpacity
          onPress={this.props.onCameraClose}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> CLOSE </Text>
        </TouchableOpacity>
      );
    }
  };
  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: false,
        skipProcessing: true,
        fixOrientation: false,
      };
      const data = await this.camera.takePictureAsync(options);
      this.props.onPictureTaken(data);
    }
  };
}
Camera.defaultProps = {
  visible: true,
  displayCloseButton: false
};
Camera.propTypes = {
  onPictureTaken: PropTypes.func.isRequired,
  onCameraClose: PropTypes.func,
  visible: PropTypes.any,
  displayCloseButton: PropTypes.any,
};
