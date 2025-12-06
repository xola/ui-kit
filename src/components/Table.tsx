import clsx from "clsx";
import React, { Children, cloneElement, useEffect, useRef, useState, ReactElement } from "react";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children?: React.ReactNode;
    className?: string;
}

export const Table = ({ className, ...rest }: TableProps) => (
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

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children?: React.ReactNode;
    className?: string;
}

const Head = ({ className, ...rest }: TableHeadProps) => {
    return <thead className={clsx("ui-table-head", "bg-gray-lighter", className)} {...rest} />;
};

Head.displayName = "Table.Head";

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    className?: string;
}

const Header = ({ className, ...rest }: TableHeaderProps) => {
    return <th className={clsx("ui-table-header", "px-4 py-2 text-left text-base font-bold", className)} {...rest} />;
};

Header.displayName = "Table.Header";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    isStriped?: boolean;
    children: React.ReactNode;
    className?: string;
}

const Body = ({ isStriped = false, children, className, ...rest }: TableBodyProps) => {
    return (
        <tbody className={clsx("ui-table-body", "border-none", className)} {...rest}>
            {Children.map(children, (child) => {
                if (!child || !React.isValidElement(child)) return child;
                return cloneElement(child as ReactElement<any>, { isStriped });
            })}
        </tbody>
    );
};

Body.displayName = "Table.Body";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    isStriped?: boolean;
    children?: React.ReactNode;
    className?: string;
}

const Row = ({ isStriped = false, className, ...rest }: TableRowProps) => {
    return <tr className={clsx("ui-table-row", isStriped && "even:bg-gray-lighter", className)} {...rest} />;
};

Row.displayName = "Table.Row";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    className?: string;
}

const Cell = ({ className, ...rest }: TableCellProps) => {
    return (
        <td
            className={clsx("ui-table-cell", "whitespace-nowrap px-4 py-2 text-base text-gray-darker", className)}
            {...rest}
        />
    );
};

Cell.displayName = "Table.Cell";

export interface EditableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    value: string;
    className?: string;
    onSave: (value: string) => void;
}

const EditableCell = ({ value, className, onSave, ...rest }: EditableCellProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const textRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalValue(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        if (isEditing) {
            // eslint-disable-next-line no-undef
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
                { "bg-gray-hover": isEditing },
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
                <div ref={textRef} className="cursor-text whitespace-pre-wrap">
                    {localValue || <span className="text-gray">Not Available</span>}
                </div>
            )}
        </td>
    );
};

EditableCell.displayName = "Table.EditableCell";

Table.Head = Head;
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.EditableCell = EditableCell;
