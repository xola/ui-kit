import clsx from "clsx";
import React from "react";
import { useId } from "../../hooks/useId";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    className?: string;
    classNames?: {
        checkbox?: string;
        label?: string;
    };
}

export const Checkbox = ({ label, className, classNames = {}, ...rest }: CheckboxProps) => {
    const id = useId("checkbox");

    return (
        <div className={clsx("ui-checkbox", className, "flex items-center")}>
            <input
                type="checkbox"
                className={clsx(
                    "ui-checkbox-input",
                    classNames.checkbox,
                    styles.checkbox,
                    "h-4 w-4 rounded !border-primary text-white transition-colors disabled:border-none disabled:bg-gray-light disabled:text-gray-light",
                )}
                {...rest}
                id={id}
            />

            {label ? (
                <label
                    htmlFor={id}
                    className={clsx("ui-checkbox-label", classNames.label, "ml-2 leading-none text-gray-darker")}
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};
