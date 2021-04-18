import clsx from "clsx";
import React from "react";

export const Label = ({ className, ...rest }) => {
    return <label className={clsx(className, "block text-sm font-bold mb-1")} {...rest} />;
};
