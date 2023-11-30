import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StatusBar
        backgroundColor="#363436"
        barStyle="light-content"
        translucent={false}
      />
      <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

// --primary-color: #ffbf00;
// --secondary-color: #c60cb1;
// --terciary-color: #ff002a;
// --bg-color: #0f0f0f;
// --bg-color-2: #363436;
