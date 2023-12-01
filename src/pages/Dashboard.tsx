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

import styles, { colors } from "../styles/styles";

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const { signOut } = useContext(AuthContext);
  const [table, setTable] = useState("");

  async function handleOpenTable() {
    const tableNumber = parseInt(table);

    if (!tableNumber || tableNumber < 1) {
      return alert("Preencha um número de mesa válido");
    }
    //Fazer requisição e ir para próxima tela
    navigation.navigate("Order", {
      number: tableNumber,
      order_id: "0eb80895-7506-4adc-a738-f7b5b84bf311",
    });
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

      <TouchableOpacity style={styles.btn} onPress={handleOpenTable}>
        <Text style={styles.btnText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
