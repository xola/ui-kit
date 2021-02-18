import { ScheduleEditor } from "..";
import React from "react";

export default {
    title: "ScheduleEditor",
};

export const Default = () => {
    return <ScheduleEditor />;
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
    };

    const handleChange = (schedule) => {
        console.log("Updated Schedule", schedule);
    };

    return <ScheduleEditor value={schedule} price={200} onChange={handleChange} />;
};
