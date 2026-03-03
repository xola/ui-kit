import clsx from "clsx";
import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BaseInput, type BaseInputProps } from "./BaseInput";

export interface TextareaProps
    extends BaseInputProps,
        Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseInputProps> {
    shouldAutoSize?: boolean;
}

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(
    ({ className, value, shouldAutoSize = false, rows = 2, ...rest }, ref) => {
        return shouldAutoSize ? (
            // TextareaAutosize has a few special props like minRows and maxRows instead of rows field so using rows field to feed the minRows prop. See full list here https://github.com/Andarist/react-textarea-autosize?tab=readme-ov-file#props
            <BaseInput
                ref={ref}
                as={TextareaAutosize}
                value={value}
                minRows={rows}
                className={clsx("ui-textarea", className)}
                {...rest}
            />
        ) : (
            <BaseInput
                ref={ref}
                as="textarea"
                value={value}
                rows={rows}
                className={clsx("ui-textarea", className)}
                {...rest}
            />
        );
    },
);

Textarea.displayName = "Textarea";
