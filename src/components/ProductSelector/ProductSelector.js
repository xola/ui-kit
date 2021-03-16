import React, { useState } from "react";
import classNames from "classnames";
import _ from "lodash";
import { Container, Row, Col, Label, Input } from "reactstrap";
import ProductListItem from "./ProductListItem/ProductListItem";

const filterProductsBySearch = (searchQuery = "", products = []) => {
    return products.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    });
};

const ProductSelector = ({ products = [], value = [], onChange }) => {
    products = JSON.parse(JSON.stringify(products));
    if (value.length > 0) {
        _.forEach(value, (product) => {
            const index = products.findIndex((p) => p.id === product.id);
            products[index].selected = true;
        });
    }

    const [searchQuery, setSearchQuery] = useState("");
    const filteredProducts = filterProductsBySearch(searchQuery, products);

    const onProductSelect = (productId) => {
        if (value.findIndex((v) => v.id === productId) >= 0) {
            onChange(value.filter((v) => productId !== v.id));
        } else {
            onChange([...value, products.find((p) => p.id === productId)]);
        }
    };

    const onSelectAll = (e) => {
        onChange(e.target.checked ? products : []);
    };

    return (
        <Container className={classNames("p-0")}>
            <Row className={classNames("d-flex align-items-center bg-light mb-1 p-3")}>
                <Col md={8}>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={products.length === value.length}
                            onChange={(e) => onSelectAll(e)}
                        />{" "}
                        {value.length} Listing(s) selected updated
                    </Label>
                </Col>
                <Col md={4}>
                    <Input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="float-right"
                    />
                </Col>
            </Row>
            <Row>
                {filteredProducts &&
                    filteredProducts.map((product) => {
                        return <ProductListItem key={product.id} onProductSelect={onProductSelect} product={product} />;
                    })}
            </Row>
        </Container>
    );
};

export default ProductSelector;
