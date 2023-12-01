import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../routes/auth.routes";

import { AuthContext } from "../contexts/AuthContext";

import styles, { colors } from "../styles/styles";

type RouteDetailParams = {
  Order: {
    number: number;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();

  return (
    <SafeAreaView style={styles.containerTop}>
      <View style={styles.header}>
        <Text style={styles.title2}>Mesa {route.params.number}</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={28} color={colors["terciary-color"]} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#fff" }}>Pizzas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#fff" }}>Pizza mexicana</Text>
      </TouchableOpacity>

      <View style={styles.containerRow}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[
            styles.input,
            {
              width: "60%",
              textAlign: "center",
              marginRight: "5%",
              fontSize: 20,
            },
          ]}
          value="1"
          placeholderTextColor={colors.coldWhite}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, {width: '75%'}]}>
          <Text style={styles.btnText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
