import { ProductsSelector } from "..";
import React from "react";
import sellers from "../values/sellers";
import products from "../values/products";

export default {
    title: "ProductsSelector",
    component: ProductsSelector,
};

export const MultipleSellers = () => {
    const onChange = (selectedProducts) => {
        console.log("Selected Products are", selectedProducts);
    };
    return <ProductsSelector onChange={onChange} sellers={sellers} products={products} />;
};

export const SingleSeller = () => {
    return <ProductsSelector products={products} />;
};
