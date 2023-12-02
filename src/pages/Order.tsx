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

import ModalPicker from "../components/ModalPicker";
import ListItem from "../components/ListItem";

import styles, { colors } from "../styles/styles";

type RouteDetailParams = {
  Order: {
    number: number;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  category_id: string;
};

export type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [categories, setCategories] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadInfo() {
      try {
        const response = await api.get("categories");
        setCategories(response.data);
        setCategorySelected(response.data[0]);
      } catch (error) {
        alert(
          "Erro ao carregar categorias. Ocorreu um erro ao carregar as categorias. Tente novamente mais tarde."
        );
        console.error("Erro ao carregar categorias:", error);
      }
    }
    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("category/products", {
          params: {
            category_id: categorySelected?.id,
          },
        });
        setProducts(response.data);
        setProductSelected(response.data[0]);
      } catch (error) {
        alert(
          "Erro ao carregar produtos. Ocorreu um erro ao carregar os produtos da categoria. Tente novamente mais tarde."
        );
        console.error("Erro ao carregar produtos:", error);
      }
    }
    if (categorySelected?.id) {
      loadProducts();
    }
  }, [categorySelected]);

  async function handleCloseOrder() {
    setLoading(true);
    try {
      await api.delete("/orders", {
        params: {
          order_id: route.params?.order_id,
        },
      });

      navigation.goBack();
    } catch (err) {
      console.log(`Erro ao excluir a ordem. ${err}`);
    } finally {
      setLoading(false);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

  async function handleAdd() {
    setLoading(true);

    if (Number(amount) === 0) {
      return setLoading(false);
    }

    try {
      const response = await api.post("orders/itens", {
        order_id: route.params.order_id,
        product_id: productSelected?.id,
        amount: Number(amount),
      });

      let data = {
        id: response.data.id as string,
        product_id: productSelected?.id as string,
        name: productSelected?.name as string,
        amount: Number(amount),
      };

      setItems((oldArray) => [...oldArray, data]);
    } catch (error) {
      alert(
        "Erro ao adicionar item. Ocorreu um erro ao adicionar o item ao pedido. Tente novamente mais tarde."
      );
      console.error("Erro ao adicionar item:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteItem(item_id: string) {
    setLoading(true);
    try {
      await api.delete("/orders/itens", {
        data: {
          item_id: item_id,
        },
      });

      let removeItem = items.filter(item =>{
        return(item.id !== item_id)
      })

      setItems(removeItem)
  
      console.log(`Item ${item_id} deletado com sucesso!`);
    } catch (error) {
      alert(
        "Erro ao excluir item. Ocorreu um erro ao excluir o item do pedido. Tente novamente mais tarde."
      );
      console.error("Erro ao excluir item:", error);
    } finally {
      setLoading(false);
    }
  }
  
  

  return (
    <SafeAreaView style={styles.containerTop}>
      <View style={styles.header}>
        <Text style={styles.title2}>Mesa {route.params.number}</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            onPress={handleCloseOrder}
            disabled={items.length !== 0}
          >
            <Feather
              name="trash-2"
              size={28}
              color={
                items.length !== 0
                  ? colors["bg-color-2"]
                  : colors["terciary-color"]
              }
            />
          </TouchableOpacity>
        )}
      </View>

      {categories.length !== 0 ? (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={styles.select}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      ) : null}

      {products.length !== 0 ? (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={styles.select}>{productSelected?.name}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.input}
          onPress={() => alert("Escolha outra categoria.")}
        >
          <Text style={[styles.select, { color: colors["terciary-color"] }]}>
            sem produtos cadastrados nesta categoria
          </Text>
        </TouchableOpacity>
      )}

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
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor={colors.coldWhite}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              width: "75%",
              opacity: items.length === 0 ? 0.4 : 1,
              backgroundColor:
                items.length === 0
                  ? colors["terciary-color"]
                  : colors["primary-color"],
            },
          ]}
          disabled={items.length === 0}
        >
          <Text style={styles.btnText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDeleteItem} />
        )}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={categories}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </SafeAreaView>
  );
}
