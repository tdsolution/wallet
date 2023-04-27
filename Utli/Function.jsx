import CryptoJS from "react-native-crypto-js";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";

// Sao chép kí tự
// Clipboard có nhiêm vụ sao chép kí tự.(https://www.npmjs.com/package/@react-native-clipboard/clipboard)
// Toast hiển thị thông báo ra.(https://www.npmjs.com/package/react-native-toast-message)
export const copyText = (text, entity = "address") => {
  Clipboard.setString(text);
  Toast.show({
    text1: `Copied ${entity} to clipboard`,
    type: "custom",
    visibilityTime: 2000,
  });
};
//  Mã hoá dữ liệu
// https://www.npmjs.com/package/react-native-crypto-js
// https://github.com/imchintan/react-native-crypto-js#readme

export const handleEncrypted = (string) => {
  const reverseString = string.split("").reverse().join("");
  const encrypted = CryptoJS.AES.encrypt(
    reverseString,
    `${process.env.REACT_APP_PASSWORD}`
  ).toString();
  const result = base64.decode(encrypted);

  return result;
};
// Hàm này chia giá trị price cho 10e7 (tương đương với 10000000) và nhân với balance, sau đó làm tròn đến 2 chữ số thập phân bằng phương thức toFixed(2)
export const caculateMoney = (price, balance) => {
  return ((price / 10e7) * balance).toFixed(2);
};
//Hàm này sử dụng biểu thức chính quy để kiểm tra xem địa chỉ có độ dài lớn hơn 12 ký tự hay không. Nếu địa chỉ có độ dài lớn hơn 12 ký tự, hàm sẽ cắt ngắn địa chỉ bằng cách giữ lại 8 ký tự đầu tiên và 4 ký tự cuối cùng, và thêm dấu chấm ba chấm giữa chúng.
export const truncateAddress = (address) => {
  const truncateRegex = /^([a-zA-Z0-9]{8})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

// Đây là một hàm tính phần trăm giảm giá giữa giá mới và giá cũ của một sản phẩm.
// Hàm sẽ tính toán phần trăm giảm giá bằng cách lấy hiệu giá mới và giá cũ, chia cho giá cũ và nhân với 100. Kết quả sẽ được trả về bởi hàm.
export const caculatePercentage = (price, oldPrice) => {
  return ((price - oldPrice) / oldPrice) * 100;
};