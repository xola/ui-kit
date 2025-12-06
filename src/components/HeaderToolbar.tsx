import clsx from "clsx";
import React from "react";
import { Breadcrumb, Search } from "..";

export interface HeaderToolbarProps {
    classNames?: string;
    children: React.ReactNode;
}

export const HeaderToolbar = ({ classNames, children }: HeaderToolbarProps) => {
    return (
        <div
            className={clsx(
                "ui-header-toolbar",
                "flex w-full items-center space-x-2 border-b border-gray-light px-5 py-3 pr-3 xl:space-x-6 xl:px-10 xl:py-5",
                classNames,
            )}
        >
            {children}
        </div>
    );
};

interface HeaderToolbarBreadcrumbProps {
    children: React.ReactNode;
    className?: string;
}

const BreadcrumbComponent = ({ children, className }: HeaderToolbarBreadcrumbProps) => {
    return (
        <Breadcrumb
            className={clsx(
                "ui-header-toolbar-breadcrumb",
                "border-r border-gray-light text-xl md:pr-4 xl:pr-6",
                className,
            )}
        >
            {children}
        </Breadcrumb>
    );
};
BreadcrumbComponent.displayName = "HeaderToolbar.Breadcrumb";

const SearchComponent = (props: any) => {
    return <Search className="ui-header-toolbar-search w-full flex-grow pr-1" {...props} />;
};
SearchComponent.displayName = "HeaderToolbar.Search";

HeaderToolbar.Breadcrumb = BreadcrumbComponent;
HeaderToolbar.Search = SearchComponent;

export type { HeaderToolbarBreadcrumbProps };
