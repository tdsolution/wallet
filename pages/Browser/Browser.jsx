import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const YOUTUBE = "https://www.youtube.com";
const Browser = () => {
  // Hiện tại đang lỗi khi thêm Webview vào
  // Đã yarn add kiểm tra version
  // ERROR  Invariant Violation: requireNativeComponent: "RNCWebView" was not found in the UIManager.(????)
  return <View>{/* <WebView source={{uri: YOUTUBE}}/> */}</View>;
};

export default Browser;
