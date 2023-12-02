import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { CategoryProps, ProductProps } from "../pages/Order";
import styles from "../styles/styles";

interface ModalPickerProps<T> {
  options: T[];
  handleCloseModal: () => void;
  selectedItem: (item: T) => void;
}

export default function ModalPicker<T>({
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps<T>) {
  function onPressItem(item: T) {
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>{(item as CategoryProps | ProductProps).name}</Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
      <View style={styles.modalContent}>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}
