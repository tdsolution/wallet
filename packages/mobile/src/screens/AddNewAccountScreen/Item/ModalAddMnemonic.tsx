import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { Checkbox, Icon } from "$uikit";
import ModalNotification from "./ModalNotification";
import { addWalletFromMnemonic } from "$libs/EVM/createWallet";
import Clipboard from "@react-native-community/clipboard";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
};

const ModalAddMnemonic = (props: Props) => {
  let Seed = [{"id": 1, "hide": false, "text": ""}]
  for (let i = 2; i < 13; i++) {
    Seed.push({"id": i, "hide": false, "text": ""}); 
  };

  const { modalVisible, onClose } = props;
  const [selectedIndex, setIndex] = useState(0);
  const [listSeed, setListSeed] = useState(Seed);
  const [titleNoti, setTileNoti] = useState("");
  const [descriptionNoti, setDescriptionNoti] = useState("");
  const [modalNotification, setModalNotification] = useState(false);
  const [status, setStatus] = useState(0);

  const setHide = ({item}) => {
    const newList = listSeed.map(obj => {
      if (obj.id === item.id) {
        return {
        ...obj, hide: !obj.hide,}}
        else {return obj;}
    });
    setListSeed(newList);
    //console.log(listSeed);
  };

  const handleTextChange = ({item, newValue}) => {
    const newList = [...listSeed]
    newList[item.id - 1].text = newValue;
    setListSeed(newList);
    //console.log(listSeed);
};

  const pasteText = async () => {
    const clipboardContent = await Clipboard.getString();
    const clipboardWords = clipboardContent.split(/\s+/);
    if (clipboardWords.length < listSeed.length) {
      setModalNotification(true);
      setTileNoti('Something wrong');
      setDescriptionNoti('Not enough words in the Clipboard, please check again.');
      return;
    } 
    const newList = listSeed.map((obj, index) => ({
      ...obj,
      text: clipboardWords[index],
    }));
    setListSeed(newList);
  };

const clearText = () => {
  const newList = listSeed.map(obj => {
   return {
      ...obj, text: "",}
  });
    setListSeed(newList);
};

const showAll = () => {
  const newList = listSeed.map(obj => {
    return {
      ...obj, hide: false,}
  });
  setListSeed(newList);
};

const handleCloseNotification = () => {
  setModalNotification(false);
  {status ? onClose() : <></>}
};

const confirmAddWallet = () => {
  let n: number = 0;
  listSeed.map((ss) => {
    if (ss.text === "") 
      n=1; 
    });
  if (n==1) {
    setModalNotification(true);
    setTileNoti('Seed phrase is wrong!');
    setDescriptionNoti('You may have entered the wrong seed phrase, please check again.');
  } 
  else {
    const mnemonic = listSeed.map(ss => ss.text).join(" ");
    console.log(mnemonic);
    async function noti() {
      const a = await addWalletFromMnemonic(mnemonic);
      if (a) {
        if (a==1) {
          setModalNotification(true);
          setTileNoti('');
          setDescriptionNoti('Wallet added successfully!');
          setStatus(1);
        }
        else {
          setModalNotification(true);
          setTileNoti('Wallet already exists!');
          setDescriptionNoti('Please enter another seed phrase.');
        }
      } 
      else {
        setModalNotification(true);
          setTileNoti('Seed phrase is wrong!');
          setDescriptionNoti('You may have entered the wrong seed phrase, please check again.');
      }
    }
    noti();
  }
}
  return (
    <Modal
      animationType="slide" // Loại animation khi mở/closed modal
      transparent={true} // Cho phép modal trở nên trong suốt
      visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
      onRequestClose={onClose}
      style = {{flex: 1}}
    >
      <Pressable
        onPress={Keyboard.dismiss}
        style={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <View style={styles.rowHeader}>
            <View>
              <TouchableOpacity style={styles.boxBack} onPress={onClose}>
                <Icon name="ic-chevron-left-16" size={20}/>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                globalStyles.textHeader,
                { color: colors.White, fontSize: 16 , marginLeft: 0},
              ]}
            >
              Add Account
            </Text>
            <View></View>
          </View>

          <View style={styles.modalContent}>
            <View>
              <View style={{alignItems: "center",}}>
                <Text style={[
                      globalStyles.textHeader,
                      { marginLeft: 0},
                    ]}
                >
                  Confirm Seed Phrase
                </Text>
              </View>
              <Text style={styles.subtitle}>
                TD Wallet cannot recover your password to validate 
                your ownership, restore your wallet and set up a new
                password. First, enter the Secret Recovery Phrase that
                you were given when you created your wallet.
              </Text>
              <View>
                <Text style={styles.subtitle}>Choose the security with:</Text>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                  <View style={styles.choose}>
                    <Checkbox
                    checked={selectedIndex === 0}
                    onChange={() => setIndex(0)
                    }/>
                    <Text style={selectedIndex ===0 ? [styles.chooseText, {color:colors.Primary}] : [styles.chooseText]}> 12-words</Text>
                  </View>
                  <View style={styles.choose}>
                    <Checkbox
                    checked={selectedIndex === 1}
                    onChange={() => setIndex(1)}/>
                    <Text style={selectedIndex ===1 ? [styles.chooseText, {color:colors.Primary}] : [styles.chooseText]}> 24-words</Text>
                  </View>  
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                  <TouchableOpacity style={[styles.button, {height: 40}]} onPress={pasteText}>
                    <Icon name="ic-copy-16" style={{marginBottom: 2, marginRight: 4}} size={14}/>
                    <Text style={styles.textButton2}>Paste seed phrase</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {height: 40, backgroundColor: "#f54949"}]} onPress={clearText} >
                    <Icon name="ic-close-16" style={{marginBottom: 2, marginRight: 2}} size={14}/>
                    <Text style={styles.textButton2}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {height: 40}]} onPress={showAll}>
                  <Image
                    style={[styles.icon, {marginBottom: 2, marginRight: 4}]}
                    source={require("../../../assets/icons_v2/ic-view.png")}
                    tintColor={colors.White}
                  />
                    <Text style={styles.textButton2}>Show all</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.inputContainer}>
                  {Seed.map((item, index) => (
                    <View style={styles.textInputContainer} key={index}>
                      <Text style={[styles.chooseText, {width: "15%"}]}>{item.id}.</Text>
                      <TextInput 
                        secureTextEntry={listSeed[index].hide}  
                        style={styles.textInput}
                        value={listSeed[index].text}
                        onChangeText={(newValue) => handleTextChange({item, newValue})}
                      ></TextInput>
                      <TouchableOpacity onPress={()=> setHide({item})} style={{marginLeft: 5}}>
                        {(listSeed[index].hide === true)
                          ? <Image
                            style={[styles.icon]}
                            source={require("../../../assets/icons_v2/ic-view.png")}
                            />
                          : <Image
                            style={[styles.icon, {tintColor: "#808080"}]}
                            source={require("../../../assets/icons_v2/ic-hide.png")}
                            />
                        }
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonConfirm} onPress={confirmAddWallet} >
              <Text style={styles.textButton}>Confirm Secret Recovery Phrase</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      <ModalNotification
        modalVisible={modalNotification}
        onClose={handleCloseNotification}
        title={titleNoti}
        description={descriptionNoti}
      />
    </Modal>
  );
};

export default ModalAddMnemonic;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalHeader: {
    width: "100%",
    backgroundColor: colors.Primary,
    alignItems: "center",
    paddingTop: 10,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pressable: {
    flex: 1,
  },
  boxBack: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "94%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "space-between"
  },
  subtitle: {
    fontSize: 14,
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    marginVertical: 5,
  },
  choose: {
    flexDirection: "row",
    alignItems: "center",
  },
  chooseText: {
    marginTop: 5,
    fontSize: 14,
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  button: {
    flexDirection:"row",
    backgroundColor: colors.Primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
  },
  buttonConfirm: {
    backgroundColor: colors.Primary,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%", 
    height: 40,    
  },
  textButton: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
  textButton2: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 15,
    padding: 5,
    //height: 330,
    //borderColor: colors.Primary,
  },
  textInputContainer: {
    padding: 9,
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    height: 35,
    width: "65%",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    paddingVertical: 0,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
