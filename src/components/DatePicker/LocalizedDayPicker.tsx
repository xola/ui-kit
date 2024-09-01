import clsx from "clsx";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import DayPicker, { DayPickerProps } from "react-day-picker";
import { Context } from "../Provider";
import { getLocalizationProps, LocaleCode, LocalizationProps } from "./DatePicker.helpers";

export const LocalizedDayPicker = forwardRef<any, DayPickerProps>(({ className, ...rest }, ref) => {
    const { locale } = useContext(Context);
    const [localizationProps, setLocalizationProps] = useState<Partial<LocalizationProps>>({});

    useEffect(() => {
        setLocalizationProps({});

        /** We don't want any localization-related props for "English" */
        if (!locale || locale === "en" || locale === "en_US") return;

        getLocalizationProps(locale as LocaleCode).then(setLocalizationProps);
    }, [locale]);

    console.log("Loca-day-picker", localizationProps);

    return <DayPicker ref={ref} className={clsx(className)} {...localizationProps} {...rest} />;
});
