import cn from "../helpers/classnames";
import PropTypes from "prop-types";
import React, { Children, cloneElement } from "react";

export const Table = ({ className, ...rest }) => (
    <div className="ui-table flex flex-col">
        <div className="-my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden border-b border-gray-lighter sm:rounded-lg">
                    <table className={cn(className, "min-w-full divide-y border border-gray-lighter")} {...rest} />
                </div>
            </div>
        </div>
    </div>
);

Table.propTypes = {
    className: PropTypes.string,
};

Table.Head = ({ className, ...rest }) => {
    return <thead className={cn("ui-table-head", "bg-gray-lighter", className)} {...rest} />;
};

Table.Head.displayName = "Table.Head";
Table.Head.propTypes = {
    className: PropTypes.string,
};

Table.Header = ({ className, ...rest }) => {
    return <th className={cn("ui-table-header", "px-4 py-2 text-left text-base font-bold", className)} {...rest} />;
};

Table.Header.displayName = "Table.Header";
Table.Header.propTypes = {
    className: PropTypes.string,
};

Table.Body = ({ className, isStriped = false, children, ...rest }) => {
    return (
        <tbody className={cn("ui-table-body", "border-none", className)} {...rest}>
            {Children.map(children, (child) => child && cloneElement(child, { isStriped }))}
        </tbody>
    );
};

Table.Body.displayName = "Table.Body";
Table.Body.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isStriped: PropTypes.bool,
};

Table.Row = ({ isStriped = false, className, ...rest }) => {
    return <tr className={cn("ui-table-row", isStriped && "even:bg-gray-lighter", className)} {...rest} />;
};

Table.Row.displayName = "Table.Row";
Table.Row.propTypes = {
    isStriped: PropTypes.bool,
    className: PropTypes.string,
};

Table.Cell = ({ className, ...rest }) => {
    return (
        <td
            className={cn("ui-table-cell", "whitespace-nowrap px-4 py-2 text-base text-gray-darker", className)}
            {...rest}
        />
    );
};

Table.Cell.displayName = "Table.Cell";
Table.Cell.propTypes = {
    className: PropTypes.string,
};
