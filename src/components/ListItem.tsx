import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "../styles/styles";
import { colors } from "../styles/styles";

import { ItemProps } from "../pages/Order";

interface ListItemProps {
  data: ItemProps;
  deleteItem: (item_id: string) => void;
  loading: boolean;
}

export default function ListItem({ data, deleteItem, loading }: ListItemProps) {
  function handleRemoveItem() {
    deleteItem(data.id);
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title3}>
        {data.amount} - {data.name}
      </Text>

      <TouchableOpacity onPress={handleRemoveItem} disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Feather name="trash-2" size={25} color={colors["terciary-color"]} />
        )}
      </TouchableOpacity>
    </View>
  );
}
