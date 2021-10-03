import { createContext } from "react";

const CartContex = createContext({
  productsCart: 0,
  addProductCart: () => null,
  getProductCart: () => null,
  removeProductCart: () => null,
  removeAllProductCart: () => null,
});

export default CartContex;
