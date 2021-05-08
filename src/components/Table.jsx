import clsx from "clsx";
import React, { Children, cloneElement } from "react";

export const Table = ({ className, ...rest }) => (
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-lighter sm:rounded-lg">
                    <table className={clsx(className, "min-w-full divide-y border border-gray-lighter")} {...rest} />
                </div>
            </div>
        </div>
    </div>
);

Table.Head = ({ className, ...rest }) => {
    return <thead className={clsx(className, "bg-gray-lighter")} {...rest} />;
};

Table.Head.displayName = "Table.Head";

Table.Header = ({ className, ...rest }) => {
    return <th className={clsx(className, "px-4 py-2 text-left text-base font-bold")} {...rest} />;
};

Table.Header.displayName = "Table.Header";

Table.Body = ({ className, striped = false, children, ...rest }) => {
    return (
        <tbody className={clsx(className, "border-none")} {...rest}>
            {Children.map(children, (child) => cloneElement(child, { striped }))}
        </tbody>
    );
};

Table.Body.displayName = "Table.Body";

Table.Row = ({ striped, className, ...rest }) => {
    return <tr className={clsx(className, striped && "even:bg-gray-lighter")} {...rest} />;
};

Table.Row.displayName = "Table.Row";

Table.Cell = ({ className, ...rest }) => {
    return <td className={clsx(className, "px-4 py-2 whitespace-nowrap text-base text-gray-darker")} {...rest} />;
};

Table.Cell.displayName = "Table.Cell";
