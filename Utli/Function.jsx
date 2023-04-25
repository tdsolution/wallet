import CryptoJS from 'react-native-crypto-js';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';



// Sao chép kí tự
// Clipboard có nhiêm vụ sao chép kí tự.(https://www.npmjs.com/package/@react-native-clipboard/clipboard)
// Toast hiển thị thông báo ra.(https://www.npmjs.com/package/react-native-toast-message)
export const copyText = (text, entity = 'address') => {
    Clipboard.setString(text);
    Toast.show({
      text1: `Copied ${entity} to clipboard`,
      type: 'custom',
      visibilityTime: 2000,
    });
  };
//  Mã hoá dữ liệu 
// https://www.npmjs.com/package/react-native-crypto-js
// https://github.com/imchintan/react-native-crypto-js#readme

  export const handleEncrypted = string => {
    const reverseString = string.split('').reverse().join('');
    const encrypted = CryptoJS.AES.encrypt(
      reverseString,
      `${process.env.REACT_APP_PASSWORD}`,
    ).toString();
    const result = base64.decode(encrypted);
  
    return result;
  };