import React from "react";
import classNames from "classnames";
import SellersListItem from "./SellersListItem";
import { Container, Row, Col } from "reactstrap";
import styles from "./SellersList.module.scss";

const SellersList = (props) => {
    return (
        <Container className={styles["sellers-list"]}>
            {props && props.sellers
                ? props.sellers.map((seller) => {
                      return (
                          <SellersListItem
                              onSellerSelect={props.onSellerSelect}
                              key={seller.id}
                              seller={seller}
                              selectedSeller={props.selectedSeller}
                          />
                      );
                  })
                : null}
        </Container>
    );
};

export default SellersList;
