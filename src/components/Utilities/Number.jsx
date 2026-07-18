import PropTypes from "prop-types";
import React from "react";
import { numberFormat } from "../../utils/numbers";
import { getDefaultLocale } from "../../utils/userLocale";

export const Number = ({ locale = getDefaultLocale(), maximumFractionDigits = 2, isCompact = false, children }) => {
    const formattedNumber = numberFormat(children, null, locale, maximumFractionDigits, isCompact);
    return <span className="ui-number">{formattedNumber}</span>;
};

Number.propTypes = {
    locale: PropTypes.string,
    maximumFractionDigits: PropTypes.number,
    isCompact: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
