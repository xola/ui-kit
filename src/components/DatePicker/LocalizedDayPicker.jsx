import React, { forwardRef, useContext, useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import { kebabCase } from "lodash-es";
import cn from "../../helpers/classnames";
import { Context } from "../Provider";
import { getLocalizationProps } from "./DatePicker.helpers";

export const LocalizedDayPicker = forwardRef(({ className, ...rest }, ref) => {
    const { locale } = useContext(Context);
    const [localizationProps, setLocalizationProps] = useState({});

    useEffect(() => {
        setLocalizationProps({});
        const localeCode = kebabCase(locale).toLowerCase();

        /** We don't want any localization-related props for "English" */
        if (!localeCode || localeCode === "en" || localeCode === "en-us") return;

        /* eslint-disable-next-line promise/prefer-await-to-then */
        getLocalizationProps(locale).then(setLocalizationProps);
    }, [locale]);

    /**
     * Note: DayPicker expects locale in en-US, es, en-GB format
     */
    return <DayPicker ref={ref} className={cn(className)} {...localizationProps} {...rest} />;
});
