import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import images from "../../../assets/images";
import ExternalShadow from "../../../commponents/BoxShadow/ExternalShadow";
import StyleHearder from "./StyleHearder";


const HearderHome = () => {
    // const getUserMoney = items => {
    //     let rs = 0;
    //     items.map(item => {
    //       try {
    //         rs += +caculateMoney(item.price, item.balance);
    //         return rs;
    //       } catch (error) {
    //         console.log('Header getUserMoney error', error);
    //       }
    //     });
    //     return rs;
    //   };
  return (
    <View style={StyleHearder.header}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
        <ExternalShadow>
          <Pressable
            style={{
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e6e7ee',
            }}>
            <View>
              <Image resizeMode="cover" source={images.logoTrendy} />
            </View>
          </Pressable>
        </ExternalShadow>
        <View style={StyleHearder.balanceNaddress}>
          <Text>.....</Text>
          <Text style={StyleHearder.balance}>
            ......
          </Text>
        </View>
      </View>
      <ExternalShadow>
        <Pressable
          style={{
            width: 20,
            height: 20,
          }}>
          <View style={StyleHearder.alertWrap}>
            <Image source={images.iconNoti} style={StyleHearder.alert} />
          </View>
        </Pressable>
      </ExternalShadow>
    </View>
  );
};

export default HearderHome;
