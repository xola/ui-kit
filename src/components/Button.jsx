import React from "react";

export const Button = ({ backgroundColor, ...rest }) => {
    return <button style={{ backgroundColor }} {...rest} />;
};
