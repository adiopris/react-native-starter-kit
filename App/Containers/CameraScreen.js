import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Alert} from 'react-native';
import {Container, Content} from 'native-base';
import I18n from '../I18n';
import ScreenSubHeader from "../Components/ScreenSubHeader";
import {CustomButton, CustomModal} from "customsoft-package";
import styles from "./Styles/CameraScreenStyle";
import Colors from "../Themes/Colors";
import ImagePicker from "react-native-image-picker";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      isVisibleCamera: false,
      isVisibleModalPickImageMethods: false,
      errors: {},
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerTitle: 'Camera'
    });
  }

  toggleModalPickImageMethods = () => {
    this.setState({isVisibleModalPickImageMethods: !this.state.isVisibleModalPickImageMethods});
  };

  handleImage = img => {
    this.setState({ photo: img });
    const {navigation} = this.props;
    navigation.navigate('ConfirmPhoto', {photo: this.state.photo});
  };

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  clearPhoto = () => {
    this.onFieldChange("photo", null);
  };

  openCamera = () => {
    const options = {
      title: "Select photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    // Launch Camera:
    ImagePicker.launchCamera(options, (response) => {
      if("didCancel" in response){
            this.clearPhoto();
      } else {
        this.handleImage(response);
        this.toggleModalPickImageMethods();
      }
    });
  };

  openLibrary = () => {
    const options = {
      title: "Select photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    // Open Image Library:
    ImagePicker.launchImageLibrary(options, (response) => {
      if("didCancel" in response){
        this.clearPhoto();
      } else {
        this.handleImage(response);
        this.toggleModalPickImageMethods();
      }
    });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container>
        <Content padder>
          <ScreenSubHeader
            title={I18n.t('header_camera_title')}
            description={I18n.t('header_camera_description')}
          />

          <CustomButton
            btnStyle={styles.button}
            onPress={this.toggleModalPickImageMethods}
            text={'Camera'}
            />

          <CustomModal
            containerStyles={{backgroundColor: Colors.silver}}
            textStyles={{
              color: Colors.darkText,
              fontWeight: 'normal',
              fontFamily: 'NunitoSans-Regular',
            }}
            title="Choose image methods"
            isVisible={this.state.isVisibleModalPickImageMethods}
            dismissHandler={this.toggleModalPickImageMethods}>
            <View style={{padding: 20}}>

              <View style={{marginTop: 100, flexDirection: 'row', justifyContent: "space-around"}}>
                <CustomButton
                  btnStyle={styles.button}
                  onPress={this.openCamera}
                  text={'Poza'}
                />
                <CustomButton
                  btnStyle={styles.button}
                  onPress={this.openLibrary}
                  text={'Upload'}
                />
              </View>
              <CustomButton
                btnStyle={styles.closeButton}
                onPress={this.toggleModalPickImageMethods}
                text={"Close"}
              />
            </View>
          </CustomModal>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
