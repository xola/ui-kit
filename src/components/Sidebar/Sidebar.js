import React, { useState } from "react";
import { NavItem, Nav } from "reactstrap";
import classNames from "classnames";
import styles from "./Sidebar.module.scss";

const Sidebar = (props) => {
    const items = props.items || [];
    const handleClick = (item) => {
        if (props.onClick) {
            props.onClick(item);
        }
    };

    return (
        <div className={styles.sidebar} style={{ width: props.width }}>
            <Nav vertical>
                {items.map((item, index) => {
                    return (
                        <NavItem
                            key={index}
                            onClick={(e) => handleClick(item)}
                            className={classNames(styles.navitem, {
                                [`${styles.active}`]: props.currentRoute && props.currentRoute === item.name,
                            })}
                        >
                            {item.label}
                        </NavItem>
                    );
                })}
            </Nav>
        </div>
    );
};

export default Sidebar;
