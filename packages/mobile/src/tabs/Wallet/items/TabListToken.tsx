import { StyleSheet, Text, View, FlatList, TouchableOpacity , Image} from "react-native";
import React from "react";
import ItemWallet from "./ItemWallet";
import { DATA } from "./Data";

const TabListToken = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingBottom:80,
      }}
    >
      <View>
        <FlatList
          // style={{ marginVertical: 25 }}
          data={DATA}
          renderItem={({ item }) => (
            <ItemWallet
              title={item.title}
              price={item.price}
              profit={item.profit}
              // image={item.imageURL}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListFooterComponent={
          <View style={{  alignItems:'center', marginBottom:40}} >
            <TouchableOpacity>
              <View style={{flexDirection:'row'}}>
                <Text style={{color:'#4871EA', fontWeight:'600', marginRight:10}}>Import Tokens</Text>
                 <Image source={require('../../../assets/logo/icon_dowload.png')}  style={{width:20,height:20}}/>
              </View>
            </TouchableOpacity>
          </View>}
          ListHeaderComponent={<View style={{ height: 10 }} />}
        />
      </View>
    </View>
  );
};

export default TabListToken;

const styles = StyleSheet.create({});
