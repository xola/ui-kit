import React from "react";
import clsx from "clsx";

export const TableRow = (props) => {
    return <tr {...props} />;
};

export const TableHead = ({ className, ...rest }) => {
    return <thead className={clsx(className, "bg-gray-lighter")} {...rest} />;
};

export const TableBody = ({ className, ...rest }) => {
    return <tbody className={clsx(className, "border-none")} {...rest} />;
};

export const TableHeader = ({ className, ...rest }) => {
    return <th className={clsx(className, "px-6 py-3 text-left text-sm font-bold")} {...rest} />;
};

export const TableCell = ({ className, ...rest }) => {
    return <td className={clsx(className, "px-6 py-4 whitespace-nowrap text-gray-darker")} {...rest} />;
};

export const Table = ({ className, ...rest }) => (
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-lighter sm:rounded-lg">
                    <table className={clsx(className, "min-w-full divide-y border border-gray-lighter")} {...rest} />
                </div>
            </div>
        </div>
    </div>
);
