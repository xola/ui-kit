import _ from "lodash";
import clsx from "clsx";
import React from "react";

export const HeaderToolbar = ({
    breadcrumb,
    search,
    classNames,
    breadcrumbClasses,
    searchClasses,
    childrenClasses,
    children,
}) => {
    const clonedSearch = React.cloneElement(search, { className: "h-full p-1 focus:ring-0 border-none" });
    return (
        <div className={clsx("w-full h-12 px-2 flex space-x-2 border-b border-gray-light", classNames)}>
            <span className={clsx("header-breadcrumb h-full flex items-center flex-grow-0", breadcrumbClasses)}>
                {breadcrumb}
            </span>
            <span className="w-1 border-r border-gray-light" />
            <div className={clsx("header-search flex-grow pr-1", searchClasses)}>{clonedSearch}</div>
            <span className={clsx("header-children w-auto h-full flex items-center space-x-6", childrenClasses)}>
                {children}
            </span>
        </div>
    );
};
