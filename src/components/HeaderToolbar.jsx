import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Search } from "..";

export const HeaderToolbar = ({ classNames, children }) => {
    return (
        <div
            className={clsx(
                "ui-header-toolbar",
                "border-gray-light flex w-full items-center space-x-2 border-b px-5 py-3 pr-3 xl:space-x-6 xl:px-10 xl:py-5",
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
            className={clsx(
                "ui-header-toolbar-breadcrumb",
                "border-gray-light border-r text-xl md:pr-4 xl:pr-6",
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
