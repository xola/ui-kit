import getUserLocale from "get-user-locale";
import React from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../helpers/numbers";

const userLocale = getUserLocale();

export const Number = ({ locale = userLocale, maximumFractionDigits = 2, compact = false, children }) => {
    const formattedNumber = numberFormat(children, null, locale, maximumFractionDigits, compact);
    return <span className="ui-number">{formattedNumber}</span>;
};

Number.propTypes = {
    locale: PropTypes.string,
    maximumFractionDigits: PropTypes.number,
    compact: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
