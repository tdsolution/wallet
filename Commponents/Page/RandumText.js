import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import styles from "../Style/Style";

const words = [
  "transfer",
  "cheese",
  "aim",
  "home",
  "ceiling",
  "alpha ",
  "lonely",
  "flat",
  "popular",
  "object",
  "mushroom",
  "man",
];

const RandumText = ({ navigation }) => {
  const [randomWords, setRandomWords] = useState([]);
  const generateRandomWords = () => {
    const randomIndexes = [];
    while (randomIndexes.length < 12) {
      const randomIndex = Math.floor(Math.random() * words.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const selectedWords = randomIndexes.map((index) => words[index]);
    setRandomWords(selectedWords);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBackTo}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButton}>
          <Image
            style={styles.backButtonimg}
            source={require("../../assets/img/icon.png")}
          />
        </Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>Cụm Từ phục hồi ví của bạn.</Text>
      <Text style={styles.loginText1}>
        Viết xuống hoặc sao chép những từ này theo đúng thứ tự và lưu chúng ở
        nơi an toàn.
      </Text>
      {/* Hiển thị 12 chữ ngẫu nhiên */}
      <Text onPress={generateRandomWords}>Đổi chữ khác</Text>
      {randomWords.map((word) => (
        <Text key={word}>{word}</Text>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RandumText;
