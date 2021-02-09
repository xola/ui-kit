import React from "react";
import classNames from "classnames";
import styles from "./ProductsListItem.module.scss";
import { Row, Col } from "reactstrap";

const ProductsListItem = (props) => {
    return (
        <Col
            xs={12}
            md={6}
            className={classNames(styles["products-list-item"])}
            onClick={() => props.onProductSelect(props.product.id)}
        >
            <Row className={classNames({ [`${styles.selected}`]: props.product.selected }, styles.row)}>
                <Col xs={3} md={2} className={styles["thumbnail-container"]}>
                    <div className={classNames(styles.thumbnail, "m-0")}>
                        {props.product.photo && props.product.photo.src ? <img src={props.product.photo.src} /> : null}
                        {props.product.selected ? (
                            <div className={styles.selected}>
                                <span>&#10003;</span>
                            </div>
                        ) : null}
                    </div>
                </Col>
                <Col xs={9} md={10}>
                    <span className={styles.title}>{props.product.name}</span>
                </Col>
            </Row>
        </Col>
    );
};

export default ProductsListItem;
