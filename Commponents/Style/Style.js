import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // CSS cho Login
  container: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    marginTop: 40,
  },
  loginText: {
    color: "#8F9FF8",
    fontSize: 24,
    lineHeight: 29,
    textAlign: "center",
    fontWeight: 500,
  },
  loginText1: {
    color: "#404358",
    textShadowColor: "rgba(38, 43, 70, 0.32)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //  CSS Button
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    background: "#E6E7EE;",
    padding: 10,
    width: 280,
    marginBottom: 25,
    alignItems: "center",
  },
  // CSS BackupLogin
  Backuplogin: {
    margin: 35,
  },
  backButton: {
    height: 26,
  },
  backButtonimg: {
    resizeMode: "contain",
  },
  BackupText: {
    flexDirection: "row",
    margin: 20,
  },
  BackupMagin: {
    marginTop: 45,
  },
  buttonBackTo: {
    justifyContent: "flex-start",
  },
  checkbox: {
    alignSelf: "center",
    marginRight: 10,
  },
  backuplogin_img: {
    width: 300,
    resizeMode: "contain",
  },
  // CSS Import
  // containerImport:{
  //   marginTop:20,
  // },
  importGoBack:{
    marginTop:40,
    marginLeft:25
  },
  Import: {
    width: 320,
    height: 500,
    padding: 25,
    backgroundColor: "#E6E7EE",
    // marginTop:20,
  },
  importbutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  importText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  importInput: {
    backgroundColor: "#E6E7EE",
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
    height:40,
    fontSize:15,
  },
  importShawdow: {
    // borderWidth: 1,
    // borderRadius: 20,
    // borderColor: "#ddd",
    // borderBottomWidth: 0,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.8,
    // shadowRadius: 20,
    // elevation: 3,
    //
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 3,
  },
  importShawdow1: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  importTextBottom: {
    color: "#404358",
    textShadowColor: "rgba(38, 43, 70, 0.32)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
  },
  importTextButton: {
    color: "#404358",
    textShadowColor: "rgba(38, 43, 70, 0.32)",
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 22,
  },
  importBottom: {
    marginTop: 30,
    backgroundColor: "#E6E7EE",
    width: 304,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  importBottomText: {
    color: "#404358",
    textShadowColor: "rgba(38, 43, 70, 0.32)",
    textShadowOffset: { width: 1, height: 1 },
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 20,
    textAlign: "center",
  },
  // Randum Text
  randumText:{
    margin:5,
    flexDirection: "row",
  },
});

export default styles;
