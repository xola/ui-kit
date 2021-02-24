import React from "react";
import classNames from "classnames";
import styles from "./ProductListItem.module.scss";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProductListItem = (props) => {
    return (
        <Col
            xs={12}
            md={6}
            className={classNames(styles.item, "cursor-pointer px-0 my-2")}
            onClick={() => props.onProductSelect(props.product.id)}
        >
            <Row className={classNames({ [`${styles.selected}`]: props.product.selected }, styles.row, "mx-3 p-3")}>
                <Col xs={3} md={2} className={classNames(styles.thumbnailContainer, "p-0")}>
                    <div className={classNames(styles.thumbnail, "w-100 m-0")}>
                        {props.product.photo && props.product.photo.src ? (
                            <img className="mw-100" src={props.product.photo.src} />
                        ) : null}
                        {props.product.selected ? (
                            <div
                                className={classNames(
                                    styles.selected,
                                    "w-100 h-100 text-white d-flex text-center align-items-center justify-content-center",
                                )}
                            >
                                <FontAwesomeIcon icon={faCheck} />
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

export default ProductListItem;
