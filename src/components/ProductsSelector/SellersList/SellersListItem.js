import React from "react";
import classNames from "classnames";
import styles from "./SellersListItem.module.scss";
import { Row, Col } from "reactstrap";

const SellersListItem = (props) => {
    function onSellerSelect() {
        if (props.selectedSeller.id === props.seller.id) {
            return;
        }
        props.onSellerSelect(props.seller);
    }

    function getDisplayName(name) {
        let nameArray = name.split(" ");
        if (nameArray.length > 1) {
            return nameArray[0][0] + nameArray[1][0];
        } else {
            return name.substring(0, 2);
        }
    }

    return (
        <Row
            onClick={() => onSellerSelect()}
            className={classNames(styles["sellers-list-item"], "m-0", {
                [`${styles["active"]}`]: props.selectedSeller.id === props.seller.id,
            })}
        >
            <Col xs={3}>
                {props.seller.photo && props.seller.photo.src ? (
                    <img src={props.seller.photo.src} />
                ) : (
                    <div className={styles.placeholder}>{getDisplayName(props.seller.name)}</div>
                )}
            </Col>
            <Col xs={9}>
                <p className={styles["seller-name"]}>{props.seller.name}</p>
            </Col>
        </Row>
    );
};

export default SellersListItem;
