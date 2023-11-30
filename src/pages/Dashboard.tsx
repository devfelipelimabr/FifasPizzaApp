import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../contexts/AuthContext";

import styles, { colors } from "../styles/styles";

async function handleOpenTable() {
  return;
}

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const [table, setTable] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
       <Image style={styles.logoMini} source={require('../assets/logo_2.png')} />
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa"
        style={styles.inputBig}
        placeholderTextColor="#d9d9d9"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.btn} onPress={handleOpenTable}>
        <Text style={styles.btnText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
