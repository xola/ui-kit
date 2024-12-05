import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React, { Children, cloneElement } from "react";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

const ButtonGroup = ({ size, value, isCollapsed = false, onChange, className, children, ...rest }) => {
    return (
        <span className={cn("ui-button-group", "inline-flex whitespace-nowrap", className)} {...rest}>
            {Children.map(children, (child, index) => {
                const buttonProps = { size };

                if (child.props.isHidden) {
                    return;
                }

                // Conditionally adding props like this so that we
                // are also able to control the props on `ButtonGroup.Button`
                // directly, if `value` and `onChange` are not passed on the parent.
                if (value !== undefined) {
                    buttonProps.isActive = value === index;
                }

                if (isCollapsed && value >= 0 && value !== index) {
                    buttonProps.shouldShowText = false;
                }

                if (onChange) {
                    buttonProps.onClick = () => onChange(index);
                }

                return cloneElement(child, buttonProps);
            })}
        </span>
    );
};

ButtonGroup.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)).isRequired,
    value: PropTypes.number.isRequired,
    isCollapsed: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const Button = ({
    as: Tag = "button",
    isActive,
    shouldShowText = true,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    isHidden = false,
    size = "medium",
    icon,
    iconPlacement = "left",
    className,
    children,
    ...rest
}) => {
    const classes = cn(
        "ui-button-group-button",
        "inline-flex border-t border-l border-b last:border-r first:rounded-l-md last:rounded-r-md transition-colors focus:ring disabled:opacity-60 focus:z-10 leading-none",
        sizes[size],
        isActive
            ? "bg-primary border-primary text-white hover:bg-primary-dark"
            : "border-gray-light hover:bg-gray-lighter text-gray-darker",
        className,
    );

    return (
        <Tag className={classes} {...rest}>
            {icon && iconPlacement === "left" ? <span className="mr-2 flex-shrink-0">{icon}</span> : null}
            {/* Always show text if the icon isn't specified */}
            {shouldShowText ? children : icon ? null : children}
            {icon && iconPlacement === "right" ? <span className="ml-2 flex-shrink-0">{icon}</span> : null}
        </Tag>
    );
};

Button.displayName = "ButtonGroup.Button";
Button.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    isActive: PropTypes.bool,
    shouldShowText: PropTypes.bool,
    isHidden: PropTypes.bool,
    size: PropTypes.oneOf(Object.keys(sizes)),
    icon: PropTypes.element,
    iconPlacement: PropTypes.oneOf(["left", "right"]),
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
ButtonGroup.Button = Button;

export { ButtonGroup };
