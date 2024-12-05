import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React from "react";

export const Panel = ({ className, ...rest }) => {
    return <div className={cn("ui-tabs-panel", className)} {...rest} />;
};

Panel.propTypes = {
    className: PropTypes.string,
};

Panel.displayName = "Tabs.Panel";
