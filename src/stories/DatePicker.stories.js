import React, { Fragment } from "react";
import { DatePicker } from "..";

export default {
    title: "DatePicker",
};

export const DatePickerFromInput = () => {
    return <DatePicker datePickerType="datePicker" />;
};

export const Calender = () => {
    return <DatePicker datePickerType="calendar" />;
};

export const MultipleDates = () => {
    return <DatePicker datePickerType="calendar" multiple={true} showDatePanel={false} />;
};
