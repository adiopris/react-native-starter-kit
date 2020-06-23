import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text} from "react-native";
import {Container, Content} from 'native-base';
import I18n from '../I18n';
import ScreenSubHeader from "../Components/ScreenSubHeader";
import styles from "./Styles/GalleryScreenStyle";

class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerTitle: 'Gallery'
    });
  }

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container>
        <Content padder>
          <ScreenSubHeader
            title={I18n.t('header_gallery_title')}
            description={I18n.t('header_gallery_description')}
          />
          <Text>Gallery</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);
