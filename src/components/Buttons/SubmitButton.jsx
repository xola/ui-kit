import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "../Spinner";
import { Button } from "./Button";

export const SubmitButton = ({ isLoading, children, ...rest }) => {
    return (
        <Button disabled={isLoading} {...rest}>
            {isLoading ? <Spinner size="current" color="current" className="mr-2" /> : null}
            {children}
        </Button>
    );
};

SubmitButton.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
};
