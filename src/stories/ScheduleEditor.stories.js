import React, { useState } from "react";
import { ScheduleEditor } from "..";

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
    const [schedule, setSchedule] = useState({
        name: "Every Thursday",
        type: "available",
        repeat: "custom",
        days: [4],
        dates: ["2021-04-14", "2021-03-14", "2021-03-21"],
        departure: "fixed",
        priceDelta: 60,
        priceDeltaType: "increase",
        times: [1235, 855],
        timeRanges: [{ startTime: 600, endTime: 1645 }, { endTime: 2240 }],
        start: new Date("2021-03-18"),
        end: new Date("2021-03-25"),
    });

    const handleChange = (schedule) => {
        console.log("Updated Schedule in STORIES", schedule);
        setSchedule(schedule);
    };

    return <ScheduleEditor value={schedule} price={200} onChange={handleChange} />;
};
