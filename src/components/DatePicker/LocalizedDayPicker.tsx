import React, { useContext } from "react";
import { Context } from "../Provider";
import DayPicker, { DayPickerProps } from "react-day-picker";
import { forwardRef, useEffect, useState } from "react";
import { getLocalizationProps, LocaleCode, LocalizationProps } from "./DatePicker.helpers";
import clsx from "clsx";

export const LocalizedDayPicker = forwardRef<any, DayPickerProps>(({ className, ...rest }, ref) => {
    const { locale } = useContext(Context);
    const [localizationProps, setLocalizationProps] = useState<Partial<LocalizationProps>>({});

    useEffect(() => {
        setLocalizationProps({});

        /** We don't want any localization-related props for "English" */
        if (locale === "en") return;

        getLocalizationProps(locale as LocaleCode).then(setLocalizationProps);
    }, [locale]);

    return <DayPicker ref={ref} className={clsx("no-translate", className)} {...localizationProps} {...rest} />;
});
