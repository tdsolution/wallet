import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
// Import Router 
import Login from "./pages/Login/Login";
import ImportScreen from "./pages/ImportScreen/ImportScreen";
import Backup from "./pages/BackupLogin/Backup";
import RestoreLogin from "./pages/RestoreLogin/RestoreLogin";
import Compare from './pages/CompareText/CompareText'

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Import" component={ImportScreen} />
        <Stack.Screen name="Backup" component={Backup} />
        <Stack.Screen name="Restore" component={RestoreLogin} />
        <Stack.Screen name="Compare" component={Compare} />
        
      </Stack.Navigator>
    </NavigationContainer>
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
