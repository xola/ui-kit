import React from "react";
import { Input } from "reactstrap";
import countries from "../../values/countries";

export const CountrySelect = (props) => {
    return (
        <Input type="select" {...props}>
            {countries.map((country) => (
                <option value={country.code} key={country.code}>
                    {country.emoji} {country.name}
                </option>
            ))}
        </Input>
    );
};
