import React from "react";
import clsx from "clsx";

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
    return <th className={clsx(className, "px-6 py-2 text-left text-base font-bold")} {...rest} />;
};

Table.Header.displayName = "Table.Header";

Table.Body = ({ className, stripe = false, children, ...rest }) => {
    let clonedChildren = stripe ? [] : children;
    stripe &&
        React.Children.forEach(children, (child, idx) => {
            const className = (idx + 1) % 2 === 0 ? "bg-gray-lighter" : "";
            clonedChildren.push(React.cloneElement(child, { className: className }));
        });

    return (
        <tbody className={clsx(className, "border-none")} {...rest}>
            {clonedChildren}
        </tbody>
    );
};

Table.Body.displayName = "Table.Body";

Table.Row = (props) => {
    return <tr {...props} />;
};

Table.Row.displayName = "Table.Row";

Table.Cell = ({ className, ...rest }) => {
    return <td className={clsx(className, "px-6 py-2 whitespace-nowrap text-base text-gray-darker")} {...rest} />;
};

Table.Cell.displayName = "Table.Cell";
