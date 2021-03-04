import React, { Component } from "react";
import classNames from "classnames";
import _ from "lodash";
import { Container, Row, Col, Label, Input } from "reactstrap";
import ProductListItem from "./ProductListItem/ProductListItem";

class ProductSelector extends Component {
    state = {
        products: [],
        filteredProducts: [],
        selectedProductsCount: 0,
        searchQuery: "",
    };

    componentDidMount = () => {
        this.updateProducts(this.props.products, this.props.value);
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.products !== this.props.products || prevProps.value !== this.props.value) {
            this.updateProducts(this.props.products, this.props.value);
        }
    };

    updateProducts = (products = [], selectedProducts = []) => {
        products = JSON.parse(JSON.stringify(products));
        if (selectedProducts && selectedProducts.length > 0) {
            _.forEach(selectedProducts, (product) => {
                const index = _.findIndex(products, (p) => p.id === product.id);
                products[index].selected = true;
            });
        }
        this.setState({
            products: products,
        });
        this.updateSelectedProductsCount(products);
        this.filterProductsBySearch(this.state.searchQuery);
    };

    updateSelectedProductsCount = (products) => {
        const count = this.getSelectedProducts(products).length;
        this.setState({
            selectedProductsCount: count,
        });
    };

    filterProductsBySearch = (searchQuery) => {
        searchQuery = searchQuery.trim();
        this.setState((prevState) => {
            const filteredProducts = prevState.products.filter((product) => {
                return product.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
            return {
                searchQuery,
                filteredProducts,
            };
        });
    };

    getSelectedProducts = (products = []) => {
        return _.filter(products, (p) => p.selected);
    };

    onChange = (products) => {
        const selectedProducts = this.getSelectedProducts(products);
        this.props.onChange(selectedProducts);
    };

    onProductSelect = (productId) => {
        let products = [...this.state.products];
        const index = _.findIndex(products, (p) => p.id === productId);
        products[index].selected = !products[index].selected;
        this.setState({
            products: products,
        });
        this.updateSelectedProductsCount(products);
        this.onChange(products);
    };

    onSelectAll = (e) => {
        const checked = e.target.checked;
        let products = [...this.state.products];
        _.forEach(products, (product) => {
            if ((checked && !product.selected) || (!checked && product.selected)) {
                product.selected = !product.selected;
            }
        });
        this.setState({
            products: products,
        });
        this.updateSelectedProductsCount(products);
        this.onChange(products);
    };

    render() {
        return (
            <Container className={classNames("p-0")}>
                <Row className={classNames("d-flex align-items-center bg-light mb-1 p-3")}>
                    <Col md={8}>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={this.state.products?.length === this.state.selectedProductsCount}
                                onChange={this.onSelectAll}
                            />{" "}
                            {this.state.selectedProductsCount} Listing(s) selected
                        </Label>
                    </Col>
                    <Col md={4}>
                        <Input
                            type="text"
                            onChange={(e) => this.filterProductsBySearch(e.target.value)}
                            placeholder="Search"
                            className="float-right"
                        />
                    </Col>
                </Row>
                <Row>
                    {this.state.filteredProducts.map((product) => {
                        return (
                            <ProductListItem
                                key={product.id}
                                onProductSelect={this.onProductSelect}
                                product={product}
                            />
                        );
                    })}
                </Row>
            </Container>
        );
    }
}

export default ProductSelector;
