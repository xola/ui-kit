import { AsYouType, getCountryCallingCode } from "libphonenumber-js";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import { CountrySelect } from "../CountrySelect";

const getCountry = (value) => {
    const asYouType = new AsYouType();
    asYouType.input(value);
    const phoneNumber = asYouType.getNumber();
    return phoneNumber && phoneNumber.country ? phoneNumber.country : null;
};

export const PhoneInput = ({ value, onChange, error, defaultCountry = "", ...rest }) => {
    const [country, setCountry] = useState(defaultCountry);
    const inputRef = useRef();
    const invalid = !!error;

    const handleValueChange = (e) => {
        onChange(e.target.value);
        setCountry(getCountry(value) || country);
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setCountry(country);
        const value = "+" + getCountryCallingCode(country);
        onChange(value);
        inputRef.current.focus();
    };

    return (
        <InputGroup>
            <CountrySelect invalid={invalid} style={{ maxWidth: 60 }} value={country} onChange={handleCountryChange} />
            <Input invalid={invalid} {...rest} innerRef={inputRef} onChange={handleValueChange} value={value} />
        </InputGroup>
    );
};

PhoneInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultCountry: PropTypes.string,
};
