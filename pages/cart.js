import React, { useEffect, useState } from "react";

//Components
import BasicLayout from "../layouts/BasicLayout";
import SummaryCart from "../components/Cart/SummaryCart";

//API Functions
import { getGameByUrlApi } from "../api/game";

//Hooks
import useCart from "../hooks/useCart";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>There's not any products on the cart</h2>
    </BasicLayout>
  );
}

function FullCart(props) {
  const { products } = props;
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(...data);
      }
      setProductsData(productsTemp);
    })();
  }, []);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart products={productsData} />
    </BasicLayout>
  );
}
