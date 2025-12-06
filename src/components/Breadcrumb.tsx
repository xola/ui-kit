import clsx from "clsx";
import React, { Children } from "react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    classNames?: {
        item?: string;
        separator?: string;
    };
    separator?: string;
    children?: React.ReactNode;
}

const BreadcrumbComponent = ({
    className,
    classNames = {},
    separator = "/",
    children,
    ...rest
}: BreadcrumbProps) => {
    const count = Children.count(children) - 1;

    return (
        <div className={clsx("ui-breadcrumb", "whitespace-nowrap text-2xl font-semibold", className)} {...rest}>
            {Children.map(children, (child, index) => {
                const isLast = index >= count;

                return (
                    <>
                        <span className={clsx(classNames.item, isLast ? "text-black" : "text-gray-dark")}>{child}</span>

                        {isLast ? null : (
                            <span className={clsx(classNames.separator, "mx-2 text-gray-dark")}>{separator}</span>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const BreadcrumbItem = ({ className, onClick, children }: BreadcrumbItemProps) => {
    return (
        <div
            className={clsx("ui-breadcrumb-item inline", onClick && "cursor-pointer hover:underline", className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

BreadcrumbItem.displayName = "Breadcrumb.Item";

export const Breadcrumb = Object.assign(BreadcrumbComponent, {
    Item: BreadcrumbItem,
});
