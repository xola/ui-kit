import getUserLocale from "get-user-locale";
import React from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../helpers/numbers";

const userLocale = getUserLocale();

export const Number = ({ locale = userLocale, maximumFractionDigits = 2, children }) => {
    const formattedNumber = numberFormat(children, null, locale, maximumFractionDigits);
    return <span className="formatted-number">{formattedNumber}</span>;
};

Number.propTypes = {
    locale: PropTypes.string,
    maximumFractionDigits: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
