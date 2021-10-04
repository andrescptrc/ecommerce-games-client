//Libraries
import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";

//Constant
import { BASE_PATH, CART } from "../utils/constants";

export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("The product has been added to the cart succesfuly");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("This is product is already added in the cart");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("The product has been added to the cart succesfuly");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}
