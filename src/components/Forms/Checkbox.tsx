import React from "react";
import cn from "../../helpers/classnames";
import { useId } from "../../hooks/useId";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    classNames?: {
        checkbox?: string;
        label?: string;
    };
    className?: string;
}

export const Checkbox = ({ label, classNames = {}, className, ...rest }: CheckboxProps) => {
    const id = useId("checkbox");

    return (
        <div className={cn("ui-checkbox", className, "flex items-center")}>
            <input
                type="checkbox"
                className={cn(
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
                    className={cn("ui-checkbox-label", classNames.label, "ml-2 leading-none text-gray-darker")}
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};
