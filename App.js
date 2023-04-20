import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import BackupLogin from "./Commponents/Page/BackupLogin";
import Login from "./Commponents/Page/Login";
import Import from "./Commponents/Page/Import";
import RandumText from "./Commponents/Page/RandumText";
import Account from "./Commponents/Page/Account";
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from "react";
import { ActivityIndicator } from 'react-native';

export default function App() {
  // const [isLoading, setIsLoading] = useState(false);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* {isLoading && <ActivityIndicator />} */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        })}
      >
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BackupLogin" component={BackupLogin} />
        <Stack.Screen name="Import" component={Import} />
        <Stack.Screen name="RandumText" component={RandumText} />
        <Stack.Screen name="Account" component={Account} />
        {/* Thêm các màn hình khác vào đây */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

