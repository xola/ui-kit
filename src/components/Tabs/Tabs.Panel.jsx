import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const Panel = ({ className, ...rest }) => {
    return <div className={clsx("ui-tabs-panel", className)} {...rest} />;
};

Panel.propTypes = {
    className: PropTypes.string,
};

Panel.displayName = "Tabs.Panel";
