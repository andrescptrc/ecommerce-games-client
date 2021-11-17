import React, { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/router";

//Components
import { ToastContainer, toast } from "react-toastify";

//Libraries
import jwtDecode from "jwt-decode";

//CSS Libraries
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Main SASS File
import "../scss/main.scss";

//API Functions
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
} from "../api/cart";
import {
  setTokenToLocalStorage,
  getTokenOfLocalStorage,
  removeTokenOfLocalStorage,
} from "../api/token";

//Context
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
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

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

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

  const authAddProduct = (product) => {
    const token = getTokenOfLocalStorage();

    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("You have to log in or sign up to buy a game");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
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

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => authAddProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: () => null,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
