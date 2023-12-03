import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../routes/auth.routes";

import { AuthContext } from "../contexts/AuthContext";

import { api } from "../services/api";

import styles, { colors } from "../styles/styles";

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const { signOut } = useContext(AuthContext);
  const [table, setTable] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleOpenTable() {
    setLoading(true);
    const tableNumber = parseInt(table);

    if (!tableNumber || tableNumber < 1) {
      alert("Preencha um número de mesa válido");
      return setLoading(false);
    }

    const response = await api.post("orders", {
      table: tableNumber,
    });

    navigation.navigate("Order", {
      number: tableNumber,
      order_id: response.data.id,
    });
    setTable("");
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logoMini} source={require("../assets/logo_2.png")} />
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa"
        style={styles.inputBig}
        placeholderTextColor="#d9d9d9"
        keyboardType="numeric"
        value={table}
        onChangeText={setTable}
      />

      <TouchableOpacity style={styles.btn} onPress={handleOpenTable} disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btnText}>Abrir mesa</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
