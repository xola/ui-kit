import clsx from "clsx";
import React from "react";

export const HeaderToolbar = ({ classNames, children }) => {
    return (
        <div className={clsx(classNames, "w-full px-10 py-5 flex items-center space-x-5 border-b border-gray-light")}>
            {children}
        </div>
    );
};
