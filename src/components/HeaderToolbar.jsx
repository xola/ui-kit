import clsx from "clsx";
import React from "react";
import { Breadcrumb, Search } from "..";

export const HeaderToolbar = ({ classNames, children }) => {
    return (
        <div className={clsx("header-toolbar flex w-full px-10 py-5 pb-6 space-x-6 border-b border-gray-light", classNames)}>
            {children}
        </div>
    );
};

HeaderToolbar.Breadcrumb = ({ children }) => {
    return (
        <>
            <Breadcrumb className="text-xl h-full flex items-center flex-grow-0">{children}</Breadcrumb>
            <span className="w-1 border-r border-gray-light" />
        </>
    );
};

HeaderToolbar.Search = (props) => {
    return <Search className="w-full flex-grow pr-1" {...props} />;
};
