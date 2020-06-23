import { StyleSheet } from "react-native";
import Colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {},
  label: {
    color: Colors.background,
    fontSize: 18,
    marginVertical: 10
  },
  imgPlaceholder: {
    height: 190,
    backgroundColor: Colors.imgPlaceholder,
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26
  },
  trashView: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 400,
    backgroundColor: "white",
    right: 5,
    top: 10,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  cameraView: {
    padding: 5,
    width: 52,
    height: 52,
    borderRadius: 400,
    backgroundColor: Colors.background,
    position: "absolute",
    zIndex: 1,
    bottom: -25,
    right: 14,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26
  }
});
