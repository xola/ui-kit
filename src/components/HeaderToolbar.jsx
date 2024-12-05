import PropTypes from "prop-types";
import React from "react";
import cn from "../helpers/classnames";
import { Breadcrumb, Search } from "..";

export const HeaderToolbar = ({ classNames, children }) => {
    return (
        <div
            className={cn(
                "ui-header-toolbar",
                "flex w-full items-center space-x-2 border-b border-gray-light px-5 py-3 pr-3 xl:space-x-6 xl:px-10 xl:py-5",
                classNames,
            )}
        >
            {children}
        </div>
    );
};

HeaderToolbar.propTypes = {
    classNames: PropTypes.string,
    children: PropTypes.node.isRequired,
};

HeaderToolbar.Breadcrumb = ({ className, children }) => {
    return (
        <Breadcrumb
            className={cn(
                "ui-header-toolbar-breadcrumb",
                "border-r border-gray-light text-xl md:pr-4 xl:pr-6",
                className,
            )}
        >
            {children}
        </Breadcrumb>
    );
};

HeaderToolbar.Breadcrumb.displayName = "HeaderToolbar.Breadcrumb";

HeaderToolbar.Breadcrumb.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

HeaderToolbar.Breadcrumb.displayName = "HeaderToolbar.Search";

HeaderToolbar.Search = (props) => {
    return <Search className="ui-header-toolbar-search w-full flex-grow pr-1" {...props} />;
};
