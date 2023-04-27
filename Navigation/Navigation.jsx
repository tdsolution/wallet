import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Backup from "../pages/BackupLogin/Backup";
import CompareText from "../pages/CompareText/CompareText";
import ImportScreen from "../pages/ImportScreen/ImportScreen";
import RestoreLogin from "../pages/RestoreLogin/RestoreLogin";
import Login from "../pages/Login/Login";
import { TransitionPresets } from "@react-navigation/stack";
import HomePages from "../pages/Home/Home";
import Discover from "../pages/Discover/Discover";
import Browser from "../pages/Browser/Browser";
import Setting from "../pages/Setting/Setting";

const Stack = createNativeStackNavigator();

const NavigationLogin = () => {
  return (
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
      <Stack.Screen name="Compare" component={CompareText} />
    </Stack.Navigator>
  );
};
export { NavigationLogin };
// ======= Home Pages ======
const HomePagesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomePages" component={HomePages} />
    </Stack.Navigator>
  );
};
export { HomePagesNavigator };
// ======= Discover  ========
const DiscoverPagesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DiscoverPages" component={Discover} />
    </Stack.Navigator>
  );
};
export { DiscoverPagesNavigation };
// ===== Browser =======
const BrowserPagesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BrowserPages" component={Browser} />
    </Stack.Navigator>
  );
};

export { BrowserPagesNavigation };
// ===== Setting ========
const SettingPagesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingPages" component={Setting} />
    </Stack.Navigator>
  );
};

export { SettingPagesNavigation };
