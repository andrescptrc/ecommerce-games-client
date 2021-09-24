import React, { useMemo, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

import "../scss/main.scss";
import {
  setTokenToLocalStorage,
  getTokenOfLocalStorage,
  removeTokenOfLocalStorage,
} from "../api/token";
import AuthContext from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getTokenOfLocalStorage();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }

    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setTokenToLocalStorage(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenOfLocalStorage();
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
