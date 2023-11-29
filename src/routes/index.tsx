import React from "react";
import { View } from "react-native";

import AuthRoutes from "./auth.routes";
import AuthlessRoutes from "./authless.routes";

export default function Routes() {
  const isAuth = false;
  const loading = false;

  return isAuth ? <AuthRoutes /> : <AuthlessRoutes />;
}
