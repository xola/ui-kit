import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children, cloneElement, useEffect, useRef, useState } from "react";

export const Table = ({ className, ...rest }) => (
    <div className="ui-table flex flex-col">
        <div className="-my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden border-b border-gray-lighter sm:rounded-lg">
                    <table className={clsx(className, "min-w-full divide-y border border-gray-lighter")} {...rest} />
                </div>
            </div>
        </div>
    </div>
);

Table.propTypes = {
    className: PropTypes.string,
};

Table.Head = ({ className, ...rest }) => {
    return <thead className={clsx("ui-table-head", "bg-gray-lighter", className)} {...rest} />;
};

Table.Head.displayName = "Table.Head";
Table.Head.propTypes = {
    className: PropTypes.string,
};

Table.Header = ({ className, ...rest }) => {
    return <th className={clsx("ui-table-header", "px-4 py-2 text-left text-base font-bold", className)} {...rest} />;
};

Table.Header.displayName = "Table.Header";
Table.Header.propTypes = {
    className: PropTypes.string,
};

Table.Body = ({ className, isStriped = false, children, ...rest }) => {
    return (
        <tbody className={clsx("ui-table-body", "border-none", className)} {...rest}>
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
    return <tr className={clsx("ui-table-row", isStriped && "even:bg-gray-lighter", className)} {...rest} />;
};

Table.Row.displayName = "Table.Row";
Table.Row.propTypes = {
    isStriped: PropTypes.bool,
    className: PropTypes.string,
};

Table.Cell = ({ className, ...rest }) => {
    return (
        <td
            className={clsx("ui-table-cell", "whitespace-nowrap px-4 py-2 text-base text-gray-darker", className)}
            {...rest}
        />
    );
};

Table.Cell.displayName = "Table.Cell";
Table.Cell.propTypes = {
    className: PropTypes.string,
};

Table.EditableCell = ({ className, value, onSave, ...rest }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const textRef = useRef(null);
    const textAreaRef = useRef(null);
    const [height, setHeight] = useState("auto");

    const handleBlur = async () => {
        setIsEditing(false);

        if (localValue !== value) {
            onSave(localValue);
        }
    };

    const handleCellClick = () => {
        if (!isEditing) {
            setIsEditing(true);
        }
    };

    const handleChange = (e) => {
        setLocalValue(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        if (isEditing) {
            requestAnimationFrame(() => {
                textAreaRef.current?.focus();
            });

            return;
        }

        if (textRef.current) {
            setHeight(`${textRef.current.scrollHeight * 1.07}px`);
        }
    }, [isEditing]);

    return (
        <td
            className={clsx(
                "ui-table-cell",
                "whitespace-nowrap px-4 py-2 text-base text-gray-darker",
                { "bg-[#F7F9FB]": isEditing },
                className,
            )}
            onClick={handleCellClick}
            {...rest}
        >
            {isEditing ? (
                <textarea
                    ref={textAreaRef}
                    value={localValue}
                    style={{ height: height }}
                    className="h-auto w-full rounded border-none p-1 focus:outline-0 focus:!ring-gray-light"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (
                <div ref={textRef} className="hover:bg-gray-50 cursor-text whitespace-pre-wrap">
                    {localValue || <span className="text-gray">Not Available</span>}
                </div>
            )}
        </td>
    );
};

Table.EditableCell.displayName = "Table.EditableCell";
Table.EditableCell.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
};
