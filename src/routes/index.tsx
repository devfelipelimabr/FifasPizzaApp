import React, {useContext} from "react";
import { ActivityIndicator, View } from "react-native";

import AuthRoutes from "./auth.routes";
import AuthlessRoutes from "./authless.routes";

import styles from "../styles/styles";
import { colors } from "../styles/styles";

import { AuthContext } from "../contexts/AuthContext";

export default function Routes() {
  const {isAuth, loading} = useContext(AuthContext)
 

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors["bg-color"],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color={colors["primary-color"]} />
      </View>
    );
  }

  return isAuth ? <AuthRoutes /> : <AuthlessRoutes />;
}
