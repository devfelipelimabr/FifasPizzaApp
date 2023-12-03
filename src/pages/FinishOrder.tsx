import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../routes/auth.routes";

import { api } from "../services/api";

import styles, { colors } from "../styles/styles";

type RouteDetailParams = {
  FinishOrder: {
    number: number;
    order_id: string;
  };
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">;

export function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [loading, setLoading] = useState(false);

  async function handleFinishOrder() {
    setLoading(true);

    try {
      await api.patch("/orders/draft", {
        order_id: route.params.order_id,
      });

      alert("Pedido finalizado com sucesso!");
      navigation.navigate("Dashboard");
    } catch (error) {
      alert(
        "Erro ao finalizar pedido. Ocorreu um erro ao finalizar o pedido. Tente novamente mais tarde."
      );
      console.error("Erro ao finalizar pedido:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.alertContainer}>
      <Text style={styles.title4}>Você deseja finalizar o pedido?</Text>
      <Text style={styles.title}>Mesa {route.params.number}</Text>

      <TouchableOpacity
        style={styles.btn2}
        disabled={loading}
        onPress={handleFinishOrder}
      >
        {
            loading ? (
                <ActivityIndicator/>
            ) : (<>
                <Text style={styles.btnTextRow}>finalizar pedido </Text>
        <Feather name="shopping-cart" size={20} color={colors["bg-color"]} />
            </>
            )
        }
      </TouchableOpacity>
    </View>
  );
}
