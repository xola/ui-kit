import React, { Component } from "react";
import classNames from "classnames";
import _ from "lodash";
import styles from "./ProductsSelector.module.scss";
import SellersList from "./SellersList/SellersList";
import ProductsList from "./ProductsList/ProductsList";
import { Container, Row, Col } from "reactstrap";

class ProductsSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMultipleSellers: this.props.sellers && this.props.sellers.length > 1,
            selectedSeller: this.props.sellers ? this.props.sellers[0] : {},
            selectedProductsCount: 0,
            sellers: this.props.sellers,
            products: [...this.props.products],
        };
    }

    clearSelectedProducts = () => {
        let products = [...this.state.products];
        _.forEach(products, (product) => {
            product.selected = false;
        });
        this.setState({
            selectedProductsCount: 0,
            products: products,
        });
    };

    onSellerSelect = (seller) => {
        this.setState({
            selectedSeller: seller,
        });
    };

    updateSelectedProductCount = () => {
        let count = _.filter([...this.state.products], (product) => product.selected).length;
        this.setState({
            selectedProductsCount: count,
        });
    };

    onProductSelect = (productIds) => {
        let products = [...this.state.products];
        _.forEach(productIds, (productId) => {
            let index = _.findIndex(products, (product) => product.id === productId);
            products[index].selected = !products[index].selected;
        });
        this.setState({
            products: products,
        });
        this.updateSelectedProductCount();
    };

    render() {
        return (
            <Container className={styles["products-selector-container"]}>
                <Row className={styles.header}>
                    <Col xs={12}>
                        <span
                            className={classNames(styles["text-hyperlink"], "float-right")}
                            onClick={this.clearSelectedProducts}
                        >
                            Clear
                        </span>
                        <span className="float-right"> {this.state.selectedProductsCount} Listing(s) selected</span>
                    </Col>
                </Row>
                <Row className={styles.selector}>
                    <Col xs={this.state.hasMultipleSellers ? "3" : "0"} className={classNames("border-right", "p-0")}>
                        {this.state.hasMultipleSellers ? (
                            <SellersList
                                onSellerSelect={this.onSellerSelect}
                                sellers={this.state.sellers}
                                selectedSeller={this.state.selectedSeller}
                            />
                        ) : null}
                    </Col>
                    <Col xs={this.state.hasMultipleSellers ? "9" : "12"}>
                        <ProductsList
                            onProductSelect={this.onProductSelect}
                            seller={this.state.selectedSeller}
                            products={this.state.products}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProductsSelector;
