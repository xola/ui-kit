import React, { Component } from "react";
import ProductsListItem from "./ProductsListItem";
import { Container, Row, Col, Input, Label } from "reactstrap";
import styles from "./ProductList.module.scss";
import ProductsSelector from "../ProductsSelector";

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products,
            searchQuery: "",
            sellerProducts: [],
            filteredProducts: [],
            selectedProductsCount: 0,
        };
    }

    componentDidMount = () => {
        this.filterProductsBySeller(this.props.products, this.props.seller);
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.products !== this.props.products || prevProps.seller !== this.props.seller) {
            this.filterProductsBySeller(this.props.products, this.props.seller);
        }
    };

    countSelectedProductsForSeller = (products) => {
        let count = _.filter([...products], (product) => product.selected).length;
        this.setState({
            selectedProductsCount: count,
        });
    };

    filterProductsBySeller = (products, seller) => {
        let sellerProducts;
        if (seller && seller.id) {
            sellerProducts = [...products].filter((product) => product.seller.id === seller.id);
        } else {
            sellerProducts = [...products];
        }
        this.setState({
            sellerProducts: sellerProducts,
        });
        this.filterProductsBySearch(this.state.searchQuery);
        this.countSelectedProductsForSeller(sellerProducts);
    };

    filterProductsBySearch = (searchQuery) => {
        searchQuery = searchQuery.trim();
        this.setState((prevState) => {
            const filteredProducts = prevState.sellerProducts.filter((product) => {
                return product.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
            return {
                searchQuery,
                filteredProducts,
            };
        });
    };

    onSelectAll = (e) => {
        let checked = e.target.checked;
        let productIds = [];
        let sellerProducts = [...this.state.sellerProducts];

        _.forEach(sellerProducts, (product) => {
            if ((checked && !product.selected) || (!checked && product.selected)) {
                productIds.push(product.id);
            }
        });
        this.props.onProductSelect(productIds);
    };

    onProductSelect = (productId) => {
        this.props.onProductSelect([productId]);
    };

    render() {
        return (
            <Container className={styles["products-list-container"]}>
                <Row className={styles["products-list-actions"]}>
                    <Col md={8}>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={this.state.sellerProducts.length === this.state.selectedProductsCount}
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
                            className={styles.searchbox}
                        />
                    </Col>
                </Row>
                <Row>
                    {this.state.filteredProducts.map((product) => {
                        return (
                            <ProductsListItem
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

export default ProductsList;
