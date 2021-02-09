import { ProductsSelector } from "..";
import React from "react";
import sellers from "../values/sellers";
import products from "../values/products";

export default {
    title: "ProductsSelector",
    component: ProductsSelector,
};

export const MultipleSellers = () => {
    return <ProductsSelector sellers={sellers} products={products} />;
};

export const SingleSeller = () => {
    return <ProductsSelector sellers={sellers[0]} products={products} />;
};
