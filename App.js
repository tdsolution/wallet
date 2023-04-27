import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import {
  SafeAreaProvider
} from "react-native-safe-area-context";
import { NavigationLogin } from "./Navigation/Navigation";
import BottomNavigation from "./Navigation/Tab";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    
    <SafeAreaProvider>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            gestureEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          })}
        >
          <Stack.Screen name="navigationlogin" component={NavigationLogin} />
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
