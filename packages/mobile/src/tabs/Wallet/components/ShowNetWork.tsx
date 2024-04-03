import { Chain } from 'chains/chain';
import React , {useState} from 'react';
import { View } from 'react-native';
interface Props {
    chains: Chain[];
}
const ShowNetwork : React.FC<Props> = ({chains}) =>{
  const handleSetActiveNetwork = (chainId: string) => {
  };
  return (
      <View></View>
  );
}
export default ShowNetwork;