import React from "react";
import { BaseInput } from "./BaseInput";

export const Select = (props) => {
    return <BaseInput as="select" {...props} />;
};

Select.propTypes = BaseInput.propTypes;
