import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Signin from "../pages/Signin";

const Stack = createNativeStackNavigator();

export default function AuthlessRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
