import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  basePadding: 10,
  largePadding: 15,
  doubleBaseMargin: 20,
  doubleBasePadding: 20,
  smallMargin: 5,
  smallPadding: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },

  headerFontSize: 25,

  // Inputs
  inputPaddingVertical: 9,
  inputPaddingHorizontal: 21,

  // Fonts
  fontSize: {
    smaller: 10,
    small: 12,
    base: 14,
    large: 17
  },
  baseFontFamily: 'NunitoSans-Regular',

  // Borders
  smallBorderRadius: 5,
  baseBorderRadius: 10,
  doubleBorderRadius: 20,
  inputHight: 60,
  labelWidth: 100,
  labelFontSize: 15,
  inputFontSize: 17,
  inputMarginHorizontal: 15,
  inputMarginBottom: 5,
  inputBorderWidth: 0.5,
  inputPaddingLeft: 10,
  formBorderRadius: 20,
  formLargePaddingTop: 20,
  formLargePaddingLeft: 20,
}

export default metrics
