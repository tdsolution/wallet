import React from "react";
import { View } from "react-native";

const YOUTUBE = "https://www.youtube.com";
const Browser = () => {
  // Hiện tại đang lỗi khi thêm Webview vào
  // Đã yarn add kiểm tra version
  // ERROR  Invariant Violation: requireNativeComponent: "RNCWebView" was not found in the UIManager.(????)
  return <View>{/* <WebView source={{uri: YOUTUBE}}/> */}</View>;
};

export default Browser;
