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

export const withValues = () => {
    const onChange = (selectedProducts) => {
        console.log("Selected Products are", selectedProducts);
    };
    const selectedProducts = [
        {
            id: "1",
            name: "Bird Watching Experience",
            seller: { id: "1" },
            photo: { src: "https://placeimg.com/140/105/animals" },
        },
        {
            id: "2",
            name: "1 Hour deep dive Scuba diving",
            seller: { id: "2" },
            photo: { src: "https://placeimg.com/140/105/nature" },
        },
        {
            id: "3",
            name: "Paragliding Experience",
            seller: { id: "1" },
            photo: { src: "https://placeimg.com/140/105/nature" },
        },
    ];
    return <ProductsSelector onChange={onChange} value={selectedProducts} sellers={sellers} products={products} />;
};
