import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import "./Button.css";

export const Button = ({
    as: Tag = "button",
    variant = "standard",
    color = "primary",
    size = "medium",
    icon,
    iconPlacement = "left",
    className,
    children,
    ...rest
}) => {
    return (
        <Tag
            className={clsx(
                "ui-button",
                `ui-button-${size}`,
                `ui-button-${variant} ui-button-${variant}-${color}`,
                className,
            )}
            {...rest}
        >
            {icon && iconPlacement === "left" ? <span className="mr-2 flex-shrink-0">{icon}</span> : null}
            {children}
            {icon && iconPlacement === "right" ? <span className="ml-2 flex-shrink-0">{icon}</span> : null}
        </Tag>
    );
};

const sizes = ["tiny", "sma;", "small", "medium", "large"];
const colors = ["primary", "secondary", "success", "danger", "caution", "warning"];
const variants = ["standard", "outline", "link"];

Button.propTypes = {
    // as: PropTypes.string,
    color: PropTypes.oneOf(colors),
    variant: PropTypes.oneOf(variants),
    size: PropTypes.oneOf(sizes),
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    icon(props, ...rest) {
        // See: https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes
        if (props.icon && !props.children) {
            return new Error(
                "UI Kit: You are using an icon without specifying children. If you want to use an icon only specify it as a child instead of prop",
            );
        }

        return PropTypes.element(props, ...rest);
    },
    iconPlacement: PropTypes.string,
};
