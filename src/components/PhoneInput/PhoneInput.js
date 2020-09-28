import { AsYouType, getCountryCallingCode } from "libphonenumber-js";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { Input, InputGroup } from "reactstrap";
import { CountrySelect } from "../CountrySelect";

export class PhoneInput extends Component {
    constructor(...args) {
        super(...args);
        this.inputRef = createRef();
        this.state = { country: "" };
    }

    handleValueChange(e) {
        const { value } = e.target;
        const country = this.getCountry(value);

        this.setState({ country }, () => {
            this.props.onChange(value);
        });
    }

    handleCountryChange(e) {
        const country = e.target.value;
        const value = "+" + getCountryCallingCode(country);

        this.setState({ country }, () => {
            this.props.onChange(value);
            this.inputRef.current.focus();
        });
    }

    getCountry(value) {
        const asYouType = new AsYouType();
        asYouType.input(value);
        const phoneNumber = asYouType.getNumber();
        return phoneNumber && phoneNumber.country ? phoneNumber.country : "";
    }

    render() {
        const { value, error, ...rest } = this.props;
        const { country } = this.state;
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
};
