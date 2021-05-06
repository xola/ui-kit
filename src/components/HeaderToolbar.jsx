import clsx from "clsx";
import React from "react";
import { Breadcrumb, Search } from "..";

export const HeaderToolbar = ({ classNames, children }) => {
    return (
        <div
            className={clsx(
                "header-toolbar flex items-center w-full px-5 pr-3 py-3 xl:px-6 xl:py-5 space-x-2 xl:space-x-6 border-b border-gray-light",
                classNames,
            )}
        >
            {children}
        </div>
    );
};

HeaderToolbar.Breadcrumb = ({ className, children }) => {
    return (
        <>
            <Breadcrumb className={clsx("text-xl border-r border-gray-light md:pr-4 xl:pr-6", className)}>{children}</Breadcrumb>
        </>
    );
};

HeaderToolbar.Search = (props) => {
    return <Search className="w-full flex-grow pr-1" {...props} />;
};
