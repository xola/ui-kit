import React, { useContext, useEffect, useState } from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { kebabCase } from "lodash-es";
import { enUS } from "date-fns/locale";
import cn from "../../helpers/classnames";
import { Context } from "../Provider";
import { getLocalizationProps, type LocaleCode, type LocalizationProps } from "./DatePicker.helpers";

export const LocalizedDayPicker = ({ className, ...rest }: DayPickerProps) => {
    const { locale } = useContext(Context);
    const [localizationProps, setLocalizationProps] = useState<Partial<LocalizationProps>>({ locale: enUS });

    useEffect(() => {
        setLocalizationProps({ locale: enUS });
        const localeCode = kebabCase(locale).toLowerCase();

        /** We don't want any localization-related props for "English" */
        if (!localeCode || localeCode === "en" || localeCode === "en-us") return;

        getLocalizationProps(locale as LocaleCode).then(setLocalizationProps);
    }, [locale]);

    /**
     * Note: DayPicker expects locale in en-US, es, en-GB format
     */
    return <DayPicker className={cn(className)} {...localizationProps} {...rest} />;
};

LocalizedDayPicker.displayName = "LocalizedDayPicker";
