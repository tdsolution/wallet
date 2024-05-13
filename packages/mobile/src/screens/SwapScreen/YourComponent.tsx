import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { SwapCoinContext } from '@tonkeeper/mobile/src/context/SwapCoinContext';

const Item = ({ name, isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: isSelected ? 'lightblue' : 'white', padding: 10 }}>
    <Text>{name}</Text>
  </TouchableOpacity>
);

const ModalCoinOrg = () => {
  const { swapCoin, setSwapCoin } = useContext(SwapCoinContext) || {};
  const itemsA = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
  const itemsB = [{ name: 'Item 4' }, { name: 'Item 5' }, { name: 'Item 6' }];

  const handleItemPress = (index) => {
    if (setSwapCoin) {
      setSwapCoin(index); // Cập nhật swapCoin khi một phần tử được chọn
    }
  };

  return (
    <View>
      <FlatList
        data={itemsA}
        renderItem={({ item, index }) => (
          <Item
            name={item.name}
            isSelected={index === swapCoin}
            onPress={() => handleItemPress(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={itemsB}
        renderItem={({ item, index }) => (
          <Item
            name={item.name}
            isSelected={index === swapCoin}
            onPress={() => handleItemPress(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ModalCoinOrg;
