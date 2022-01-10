import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const Panel = ({ isActive = false, className, ...rest }) => {
    return <div className={clsx("ui-tabs-panel", className, isActive || "hidden")} {...rest} />;
};

Panel.propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
};

Panel.displayName = "Tabs.Panel";
