import _ from "lodash";
import { formatDate } from "../../../";

function getDateRangeDescription(schedule) {
    let dateRangeDescription = "";
    if (!schedule.start && !schedule.end) {
        return dateRangeDescription;
    }
    if (schedule.start) {
        dateRangeDescription += ` Starting on ${formatDate(new Date(schedule.start), "MM/dd/yyyy")}`;
    }
    if (schedule.end) {
        dateRangeDescription += ` untill ${formatDate(new Date(schedule.end), "MM/dd/yyyy")}`;
    }
    return dateRangeDescription;
}

function getWeeklyDescription(selectedWeekNumbers) {
    let weekDescription = "";
    let weekNameArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    selectedWeekNumbers.forEach((weekNumber, index) => {
        weekDescription += weekNameArr[weekNumber];
        if (index < selectedWeekNumbers.length - 1) {
            weekDescription += ", ";
        }
    });
    return weekDescription;
}

function getCustomDateDescription(selectedDates) {
    let displayDates = selectedDates.slice(0, 4);
    let customDateDescription = "";
    displayDates.forEach((displayDate, index) => {
        customDateDescription += new Date(displayDate).toLocaleDateString("en-US");
        if (index < displayDates.length - 1) {
            customDateDescription += ", ";
        }
    });
    customDateDescription += selectedDates.length - 4 > 0 ? ` and ${selectedDates.length - 4} more dates` : "";
    return customDateDescription;
}

function getPriceDescription(schedule, basePrice) {
    if (schedule.type === "unavailable" || !basePrice) {
        return "";
    }
    const { priceDelta, priceDeltaType } = schedule;
    if (priceDeltaType === "increase") {
        basePrice += parseFloat(priceDelta);
    } else if (priceDeltaType === "decrease") {
        basePrice -= parseFloat(priceDelta);
    }
    return ` for $ ${basePrice}`;
}

function formatNumberToTime(time) {
    const minute = time % 100;
    let meridian = "AM";
    let hour = parseInt(time / 100);
    if (hour === 0) {
        hour = 12;
    } else if (hour === 12) {
        meridian = "PM";
    } else if (hour > 12) {
        hour -= 12;
        meridian = "PM";
    }
    return `${hour}:${minute < 10 ? "0" + minute : minute} ${meridian}`;
}

function getTimesDescription(schedule) {
    let times = _.sortBy(_.filter(schedule.times, (time) => time !== null));
    if (schedule.type === "unavailable" || schedule.departure !== "fixed" || !times || times.length === 0) {
        return "";
    }
    let timesDescription = " at ";
    let timesArray = _.map(times, (time) => formatNumberToTime(time));
    return timesDescription + timesArray.join(", ");
}

function getTimeRangeDescription(schedule) {
    if (schedule.type === "available" || !schedule.timeRanges || schedule.timeRanges.length === 0) {
        return "";
    }
    let timeRangeArray = [];
    schedule.timeRanges.forEach((timeRange, index) => {
        if (timeRange.startTime && timeRange.endTime) {
            timeRangeArray.push(
                `${index === 0 ? "between" : ""} ${formatNumberToTime(timeRange.startTime)} - ${formatNumberToTime(
                    timeRange.endTime,
                )}`,
            );
        } else if (timeRange.startTime) {
            timeRangeArray.push(` after ${formatNumberToTime(timeRange.startTime)}`);
        } else if (timeRange.endTime) {
            timeRangeArray.push(` before ${formatNumberToTime(timeRange.endTime)}`);
        }
    });
    return ` for trips ${timeRangeArray.join(", ")}`;
}

function getPrefixDescription(schedule) {
    let prefixDescription = "";
    let availableDescription = "";
    if (schedule.repeat === "weekly") {
        prefixDescription = schedule.days.length === 7 ? `Daily` : `Every ${getWeeklyDescription(schedule.days)}`;
        availableDescription = schedule.type === "available" ? "" : "Blackout ";
    } else {
        if (schedule.dates.length === 0) {
            prefixDescription = "Custom dates (no dates selected)";
            availableDescription = schedule.type === "available" ? "" : "Blackout ";
        } else {
            prefixDescription = ` ${getCustomDateDescription(schedule.dates)}`;
            availableDescription = schedule.type === "available" ? "Occurs on" : "Blackout for trips departing on";
        }
    }
    return availableDescription + prefixDescription;
}

export function getScheduleSummary(schedule, price = 0) {
    return (
        getPrefixDescription(schedule) +
        getTimesDescription(schedule) +
        getPriceDescription(schedule, price) +
        getDateRangeDescription(schedule) +
        getTimeRangeDescription(schedule)
    );
}
