import clsx from "clsx";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import DayPicker, { DayPickerProps } from "react-day-picker";
import { kebabCase } from "lodash-es";
import { Context } from "../Provider";
import { getLocalizationProps, LocaleCode, LocalizationProps } from "./DatePicker.helpers";

export const LocalizedDayPicker = forwardRef<any, DayPickerProps>(({ className, ...rest }, ref) => {
    const { locale } = useContext(Context);
    const [localizationProps, setLocalizationProps] = useState<Partial<LocalizationProps>>({});

    useEffect(() => {
        setLocalizationProps({});
        const localeCode = kebabCase(locale).toLowerCase();

        /** We don't want any localization-related props for "English" */
        if (!localeCode || localeCode === "en" || localeCode === "en-us") return;

        /* eslint-disable-next-line promise/prefer-await-to-then */
        getLocalizationProps(locale as LocaleCode).then(setLocalizationProps);
    }, [locale]);

    /**
     * Note: DayPicker expects locale in en-US, es, en-GB format
     */
    return <DayPicker ref={ref} className={clsx(className)} {...localizationProps} {...rest} />;
});
