import React, { useState, useEffect, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type AuthCtxData = {
  user: UserProps;
  isAuth: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

type UserProps = {
  id: number;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthCtxData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: 0,
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuth = !!user.name;

  useEffect(() => {
    async function getUser() {
      //Pegar os dados salvos do user no storage
      const userInfo = await AsyncStorage.getItem("@fifaspizzauth");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      //Verificar se recebeu as infos do user
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }

      setLoading(false);
    }
    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("session", {
        email,
        password,
      });

      const user = response.data;

      await AsyncStorage.setItem("@fifaspizzauth", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      setUser(user);
    } catch (err) {
      console.log(`Erro ao acessar. ${err}`);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.clear();
      setUser({
        id: 0,
        name: "",
        email: "",
        token: "",
      });
    } catch (err) {
      console.log(`Erro ao deslogar. ${err}`);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuth, signIn, loadingAuth, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
