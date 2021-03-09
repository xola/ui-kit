import { ScheduleEditor } from "..";
import React from "react";

export default {
    title: "ScheduleEditor",
};

export const Default = () => {
    const handleChange = (schedule) => {
        console.log("Updated Schedule", schedule);
    };
    return <ScheduleEditor onChange={handleChange} />;
};

export const WithValues = () => {
    const schedule = {
        name: "Every Thursday",
        type: "available",
        repeat: "weekly",
        days: [4],
        dates: [],
        departure: "fixed",
        priceDelta: 60,
        priceDeltaType: "increase",
        times: [1235, 855],
        timeRanges: [],
        start: new Date("2021-03-18"),
        end: new Date("2021-03-25"),
    };

    const handleChange = (schedule) => {
        console.log("Updated Schedule", schedule);
    };

    return <ScheduleEditor value={schedule} price={200} onChange={handleChange} />;
};
