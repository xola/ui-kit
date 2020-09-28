import classNames from "classnames";
import React, { cloneElement } from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormInput = ({ label, error, ...rest }) => {
    return (
        <FormGroup>
            <Label htmlFor={rest.id} className={classNames({ "text-danger": error })}>
                <span className={classNames({ "font-weight-bold": error })}>{label}</span> {error}
            </Label>

            {rest.type === "select" || !rest.children ? (
                <Input id={rest.id} invalid={!!error} {...rest} />
            ) : (
                cloneElement(rest.children, rest)
            )}
        </FormGroup>
    );
};

export default FormInput;
