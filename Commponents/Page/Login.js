import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import styles from "../Style/Style";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 1,
    image: require("../../assets/img/Frame20.png"),
    title: "All assets in one placea",
    description: "View and store your assets easily.",
  },
  {
    id: 2,
    image: require("../../assets/img/Frame20.png"),
    title: "2",
    description: "2",
  },
  {
    id: 3,
    image: require("../../assets/img/Frame20.png"),
    title: "3",
    description: "3",
  },
];
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigate = () => {
    setIsLoading(true); // Set isLoading = true khi chuyển trang
    setTimeout(() => {
      setIsLoading(false); // Set isLoading = false sau 1s để tắt hiệu ứng loading
      navigation.navigate("BackupLogin");
    }, 3000);
  };
  const navigation = useNavigation();
  // console.log("ffffffffffffff",navigation);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.login}>
        <Image source={item.image} />
        <Text style={styles.loginText}>{item.title}</Text>
        <Text style={styles.loginText1}>{item.description}</Text>
      </View>
    );
  };

  return (
    // Carousel chuyển đổi hình
    <View style={styles.login}>
      <View style={styles.container}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
        />
        {/* Button chuyển trang */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            {isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <Text>Create a new wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Import")}>
            <Text>I have wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
