import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { Checkbox, Icon } from "$uikit";
import ModalNotification from "./ModalNotification";
import { addWalletFromMnemonic } from "$libs/EVM/createWallet";
import Clipboard from "@react-native-community/clipboard";
import { Text, deviceHeight } from "@tonkeeper/uikit";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  callback: () => void;
};
const HEIGHT_RATIO = deviceHeight / 844;

const ModalAddMnemonic = (props: Props) => {
  let Seed = [{"id": 1, "hide": false, "text": ""}]
  const { modalVisible, onClose, callback } = props;
  const [selectedIndex, setIndex] = useState(0);
  const [listSeed, setListSeed] = useState(Seed);
  const [titleNoti, setTileNoti] = useState("");
  const [descriptionNoti, setDescriptionNoti] = useState("");
  const [modalNotification, setModalNotification] = useState(false);
  const [status, setStatus] = useState(0);
  

  useEffect(() => {
    let newList = [{"id": 1, "hide": false, "text": ""}]
    if (selectedIndex) {
    for (let i = 2; i <= 24; i++) {
      newList.push({"id": i, "hide": false, "text": ""}); 
    };}
    else{
      for (let i = 2; i <= 12; i++) {
        newList.push({"id": i, "hide": false, "text": ""}); 
      };
    }
    setListSeed(newList);
  },[selectedIndex]);

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
    {status ? (onClose(), callback()) : <></>}
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
    >
      <ScrollView  showsVerticalScrollIndicator={false} style={{backgroundColor: "#fafafa"}}>
        <Pressable
          onPress={Keyboard.dismiss}
          style={{backgroundColor: colors.Primary}}
        >
          <SafeAreaView style={styles.rowHeader}>
            <View>
              <TouchableOpacity style={styles.boxBack} onPress={onClose}>
                <Icon name="ic-chevron-left-16" size={20}/>
              </TouchableOpacity>
            </View>
            <Text
             type="label1"
             style={{marginRight: 22 * HEIGHT_RATIO}}
            >
              Add Account
            </Text>
            <View></View>
          </SafeAreaView>

          <View style={styles.modalContent}>
            <View>
              <View style={{alignItems: "center",}}>
                <Text 
                type="h3"
                color="primaryColor"
                style={{marginBottom: 10 * HEIGHT_RATIO}}
                >
                  Confirm Seed Phrase
                </Text>
              </View>
              <Text type="body1" color="textPrimaryAlternate">
                TD Wallet cannot recover your password to validate 
                your ownership, restore your wallet and set up a new
                password. First, enter the Secret Recovery Phrase that
                you were given when you created your wallet.
              </Text>
              <View>
                <Text type="body1" color="textPrimaryAlternate" style={{marginTop: 10 * HEIGHT_RATIO}}>Choose the security with:</Text>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                  <View style={styles.choose}>
                    <Checkbox
                    checked={selectedIndex === 0}
                    onChange={() => setIndex(0)
                    }/>
                    <Text type="body1" style={selectedIndex ===0 ?  {color:colors.Primary} : {color:colors.Black}}> 12-words</Text>
                  </View>
                  <View style={styles.choose}>
                    <Checkbox
                    checked={selectedIndex === 1}
                    onChange={() => setIndex(1)}/>
                    <Text type="body1" style={selectedIndex ===1 ?  {color:colors.Primary} : {color:colors.Black}}> 24-words</Text>
                  </View>  
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                  <TouchableOpacity style={[styles.button, {height: 40}]} onPress={pasteText}>
                    <Icon name="ic-copy-16" style={{marginBottom: 2 * HEIGHT_RATIO, marginRight: 4 * HEIGHT_RATIO}} size={14}/>
                    <Text type="label2">Paste seed phrase</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {height: 40, backgroundColor: "#f54949"}]} onPress={clearText} >
                    <Icon name="ic-close-16" style={{marginBottom: 2 * HEIGHT_RATIO, marginRight: 2 * HEIGHT_RATIO}} size={14}/>
                    <Text type="label2">Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {height: 40}]} onPress={showAll}>
                  <Image
                    style={[styles.icon, {marginBottom: 2 * HEIGHT_RATIO, marginRight: 4 * HEIGHT_RATIO}]}
                    source={require("../../../assets/icons_v2/ic-view.png")}
                    tintColor={colors.White}
                  />
                    <Text type="label2">Show all</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.inputContainer}>
                  {listSeed.map((item, index) => (
                    <View style={styles.textInputContainer} key={index}>
                      <Text type="body1" color="textPrimaryAlternate" style={{width: "15%", marginTop: 5 * HEIGHT_RATIO}}>{item.id}.</Text>
                      <TextInput 
                        secureTextEntry={item.hide}  
                        style={styles.textInput}
                        value={item.text.toLocaleLowerCase()}
                        onChangeText={(newValue) => handleTextChange({item, newValue})}
                      ></TextInput>
                      <TouchableOpacity onPress={()=> setHide({item})} style={{marginLeft: 5}}>
                        {(item.hide === true)
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
          </View>
        </Pressable>
      </ScrollView>
      <View style={{paddingHorizontal: 20 * HEIGHT_RATIO, backgroundColor: "#fff",}}>
        <TouchableOpacity style={styles.buttonConfirm} onPress={confirmAddWallet}>
          <Text type="label1">Confirm Secret Recovery Phrase</Text>
        </TouchableOpacity>
      </View>
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

const styles =  StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    //flex: 1,// Màu nền của modal
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20 * HEIGHT_RATIO,
    paddingHorizontal: 15 * HEIGHT_RATIO,
  },
  boxBack: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10 * HEIGHT_RATIO,
    padding: 20 * HEIGHT_RATIO,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "space-between"
  },
  choose: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    flexDirection:"row",
    backgroundColor: colors.Primary,
    borderRadius: 20,
    paddingHorizontal: 12 * HEIGHT_RATIO,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13 * HEIGHT_RATIO,
  },
  buttonConfirm: {
    backgroundColor: colors.Primary,
    borderRadius: 25,
    paddingHorizontal: 10 * HEIGHT_RATIO,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10 * HEIGHT_RATIO,
    width: "100%", 
    height: 40,  
  },
  inputContainer: {
    marginTop: 20 * HEIGHT_RATIO,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 15,
    padding: 5 * HEIGHT_RATIO,
    //height: 330,
    //borderColor: colors.Primary,
  },
  textInputContainer: {
    padding: 9 * HEIGHT_RATIO,
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    paddingHorizontal:10 * HEIGHT_RATIO,
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
