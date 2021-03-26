import React from "react";

export const Button = ({ backgroundColor, ...rest }) => {
    return <button style={{ backgroundColor }} {...rest} className="bg-blue-500 text-white px-4 py-2 rounded" />;
};
