import { ProductSelector } from "..";
import React from "react";
import products from "../values/products";

export default {
    title: "ProductSelector",
};

export const Default = () => {
    const onChange = (selectedProducts) => {
        console.log("Selected Products are", selectedProducts);
    };
    return <ProductSelector onChange={onChange} products={products} />;
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
    return <ProductSelector onChange={onChange} value={selectedProducts} products={products} />;
};
