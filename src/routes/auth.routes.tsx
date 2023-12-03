import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import { FinishOrder } from "../pages/FinishOrder";
import { colors } from "../styles/styles";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: number
    order_id: string
  };
  FinishOrder: {
    number: number
    order_id: string
  };
};

const Stack = createNativeStackNavigator<StackParamsList>();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />

      <Stack.Screen
      name="FinishOrder"
      component={FinishOrder}
      options={{ 
        title: 'Finalizando',
        headerStyle:{
          backgroundColor: colors["bg-color"]
        },
        headerTintColor: colors["primary-color"]
       }}
      />
    </Stack.Navigator>
  );
}
