import PropTypes from "prop-types";
import React  from "react";
import { Switch } from "../..";

export const PastAvailabilityToggle = ({ isChecked = false, onChange }) => {
    const handleChange = () => {
        onChange();
    };

    return (
        <div className="px-5 pb-5">
            <Switch.Group>
                <Switch isChecked={isChecked} size="large" onChange={() => handleChange()} />
                <Switch.Label direction="right">Show past availability</Switch.Label>
            </Switch.Group>
        </div>
    );
};

PastAvailabilityToggle.propTypes = {
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
};
