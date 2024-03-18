import dayjs, { isDayjs } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);

const DayTimeStart = "T00:00:00";
const DayTimeEnd = "T23:59:59";

export const formatDate = (date, format = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
};

export const formatDateWithTimezone = (date, format = "YYYY-MM-DD") => {
    return dayjs.tz(date).format(format);
};

export const formatTime = (time, format = "h:mm a") => {
    const stringTime = String(time).padStart(4, 0); // 700 to 0700
    return dayjs(stringTime, "hhmm").format(format);
};

export const dateFromObjectId = (id) => {
    return dayjs(new Date(Number.parseInt(id.slice(0, 8), 16) * 1000));
};

export const now = (date, unit) => {
    if (!date) {
        if (unit) {
            return dayjs.tz().startOf(unit);
        }

        return dayjs.tz();
    }

    if (typeof date === "number") {
        const timestamp = date <= 2_147_483_647 ? date * 1000 : date;
        return dayjs.tz(timestamp);
    }

    if (typeof date === "string") {
        return dayjs.tz(date);
    }

    if (isDayjs(date)) {
        // We do this late because under some conditions this is expensive (see: X2-9122)
        return date;
    }

    if (date instanceof Date && !Number.isNaN(date.getTime())) {
        return dayjs.tz(dateToString(date));
    }

    return dayjs.tz();
};

const padNumber = (value) => value.toString().padStart(2, "0");

export const dateToString = (date) => {
    const dateString = `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
    const timeString = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
    return `${dateString} ${timeString}`;
};

export const getJSDate = (daysDate, isStartDate = true) => {
    const time = isStartDate ? DayTimeStart : DayTimeEnd;

    return new Date(formatDateWithTimezone(daysDate) + time);
};
