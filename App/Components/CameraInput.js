import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import CameraIcon from "../Images/svgs/camera.svg";
import TrashIcon from "../Images/svgs/trash-gray.svg";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import styles from "./Styles/CameraInputStyle";

export default class CameraInput extends Component {
  static propTypes = {
    onPhotoTaken: PropTypes.func,
    onCancel: PropTypes.func,
    mode: PropTypes.string,
    preview: PropTypes.object,
    containerStyles: PropTypes.object,
    labelStyles: PropTypes.object
  };
  static defaultProps = {
    onPhotoTaken: () => {},
    onCancel: () => {},
    mode: "withPreview",
    preview: { uri: null },
    containerStyles: {},
    labelStyles: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      photo: props.preview.uri ? props.preview : null
    };
  }

  onTrashPress = () => {
    this.setState({ photo: null });
    this.props.onCancel();
  };
  onCameraPress = () => {
    const options = {
      title: "Select photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        return true;
      } else if (response.error) {
        Alert.alert(null, "ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          photo: source
        });
        this.props.onPhotoTaken(response);
      }
    });
  };

  renderCameraIcon() {
    return (
      <TouchableOpacity style={styles.cameraView} onPress={this.onCameraPress}>
        <CameraIcon />
      </TouchableOpacity>
    );
  }

  renderTrash() {
    if (!this.state.photo) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.trashView} onPress={this.onTrashPress}>
        <TrashIcon />
      </TouchableOpacity>
    );
  }

  render() {
    if (this.props.mode === "withPreview") {
      return this.renderWithPreview();
    }
    if (this.props.mode === "simple") {
      return this.renderSimple();
    }
  }
  renderSimple() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyles]}
        onPress={this.onCameraPress}
      >
        <Text style={[styles.label, this.props.labelStyles]}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
  renderWithPreview() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        <Text style={[styles.label, this.props.labelStyles]}>
          {this.props.label}
        </Text>
        <View style={styles.imgPlaceholder}>
          <Image
            source={this.state.photo}
            style={styles.photo}
            resizeMode={"cover"}
          />
          {this.renderTrash()}
          {this.renderCameraIcon()}
        </View>
      </View>
    );
  }
}
