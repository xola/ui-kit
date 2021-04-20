import clsx from "clsx";
import React from "react";

export const FormGroup = ({ className, ...rest }) => {
    return <div className={clsx(className, "mb-4")} {...rest} />;
};
