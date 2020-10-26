import { AsYouType, getCountryCallingCode } from "libphonenumber-js";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { Input, InputGroup } from "reactstrap";
import { CountrySelect } from "../CountrySelect";

export class PhoneInput extends Component {
    constructor(...args) {
        super(...args);
        this.inputRef = createRef();
    }

    handleValueChange(e) {
        this.props.onChange(e.target.value);
    }

    handleCountryChange(e) {
        const country = e.target.value;
        const value = "+" + getCountryCallingCode(country);
        this.props.onChange(value);
        this.inputRef.current.focus();
    }

    getCountry() {
        const { value, defaultCountry = "" } = this.props;
        const asYouType = new AsYouType();
        asYouType.input(value);
        const phoneNumber = asYouType.getNumber();
        return phoneNumber && phoneNumber.country ? phoneNumber.country : defaultCountry;
    }

    render() {
        const { value, error, defaultCountry, ...rest } = this.props;
        const country = this.getCountry();
        const invalid = !!error;

        return (
            <InputGroup>
                <CountrySelect
                    invalid={invalid}
                    style={{ maxWidth: 60 }}
                    value={country}
                    onChange={(e) => this.handleCountryChange(e)}
                />

                <Input
                    invalid={invalid}
                    {...rest}
                    innerRef={this.inputRef}
                    onChange={(e) => this.handleValueChange(e)}
                    value={value}
                />
            </InputGroup>
        );
    }
}

PhoneInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultCountry: PropTypes.string,
};
