import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
import {Container, Content} from 'native-base';
import I18n from '../I18n';
import ScreenSubHeader from "../Components/ScreenSubHeader";
import {CustomButton, CustomModal} from "customsoft-package";
import styles from "./Styles/ConfirmPhotoScreenStyle";
import Colors from "../Themes/Colors";
import PhotoActions from '../Redux/PhotoRedux';

class ConfirmPhotoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: props.route.params.photo,
      isVisibleModalZoomPhoto: false,
      errors: {},
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerTitle: 'Confirm photo',
      showBackButton: true,
      previous: {}
    });
  }

  handleImage = img => {
    this.setState({ photo: img });
  };


  toggleModalZoomPhoto = () => {
    this.setState({isVisibleModalZoomPhoto: !this.state.isVisibleModalZoomPhoto});
  };

  previewPhoto = (forceFullScreen = false) => {
    let photoStyle = forceFullScreen ? styles.photoFull : styles.photo;

    if (this.state.photo) {
      return <Image
        source={{ uri: this.state.photo.uri }}
        style={photoStyle}
        resizeMode={"cover"}
      />
    }

    return null;
  };

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  openModalZoomPhoto = () => {
    this.toggleModalZoomPhoto();
  };
  deletePhoto = () => {
    const {navigate} = this.props.navigation;
    this.onFieldChange("photo", null);
    navigate("Camera", {photo: null});
  };
  savePhoto = () => {
    this.props.savePhoto(this.state.photo);
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
          <ScreenSubHeader
            title={I18n.t('header_confirm_photo_title')}
            description={I18n.t('header_confirm_photo_description')}
          />
          <View style={styles.previewPhotoBox}>
            {this.previewPhoto()}
          </View>
          <View style={styles.actionsRow}>
            <CustomButton
              btnStyle={styles.button}
              onPress={this.openModalZoomPhoto}
              text={'Zoom'}
            />
            <CustomButton
              btnStyle={styles.button}
              onPress={this.deletePhoto}
              text={'Delete'}
            />
            <CustomButton
              btnStyle={styles.button}
              onPress={this.savePhoto}
              text={'Save'}
            />
          </View>

        <CustomModal
          containerStyles={{flex: 1, paddingTop: 30, backgroundColor: Colors.silver}}
          textStyles={{
            color: Colors.darkText,
            fontWeight: 'normal',
            fontFamily: 'NunitoSans-Regular',
          }}
          title="Zoooom photo"
          isVisible={this.state.isVisibleModalZoomPhoto}
          dismissHandler={this.toggleModalZoomPhoto}>
            <View style={styles.fullPhotoBox}>
              {this.previewPhoto(true)}
            </View>
              <CustomButton
                btnStyle={styles.closeButton}
                onPress={this.toggleModalZoomPhoto}
                text={"Close"}
              />
        </CustomModal>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    savePhoto: photo => dispatch(PhotoActions.savePhotoRequest(photo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPhotoScreen);
