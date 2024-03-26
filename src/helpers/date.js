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

export const DateFormat = {
    DATE_ISO: "YYYY-MM-DD",
};

export const isValidTimeZoneName = (timezoneName) => {
    try {
        dayjs.tz(new Date(), timezoneName);
    } catch {
        return false;
    }

    return true;
};

export const formatDate = (date, format = DateFormat.DATE_ISO) => {
    return dayjs(date).format(format);
};

export const formatTime = (time, format = "h:mm a") => {
    const stringTime = String(time).padStart(4, 0); // 700 to 0700
    return dayjs(stringTime, "hhmm").format(format);
};

export const dateFromObjectId = (id) => {
    return dayjs(new Date(Number.parseInt(id.slice(0, 8), 16) * 1000));
};

export const now = (date, timezone) => {
    if (!date) {
        return timezone ? dayjs().tz(timezone).startOf("day") : dayjs();
    }

    if (typeof date === "number") {
        const timestamp = date <= 2_147_483_647 ? date * 1000 : date;
        return timezone ? dayjs(timestamp).tz(timezone) : dayjs(timestamp);
    }

    if (typeof date === "string") {
        return timezone ? dayjs(date).tz(timezone) : dayjs();
    }

    if (isDayjs(date)) {
        // We do this late because under some conditions this is expensive (see: X2-9122)
        return date;
    }

    if (date instanceof Date && !Number.isNaN(date.getTime())) {
        return timezone ? dayjs(dateToString(date)).tz(timezone) : dayjs(dateToString(date));
    }

    return timezone ? dayjs().tz(timezone) : dayjs();
};

const padNumber = (value) => value.toString().padStart(2, "0");

export const dateToString = (date) => {
    const dateString = `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
    const timeString = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
    return `${dateString} ${timeString}`;
};

const DayTimeStart = "T00:00:00";
const DayTimeEnd = "T23:59:59";

export const toDate = (date, isStartDate = true) => {
    const suffix = isStartDate ? DayTimeStart : DayTimeEnd;

    if (isDayjs(date)) {
        return new Date(date.format(DateFormat.DATE_ISO) + suffix);
    }

    return new Date(formatDate(date) + suffix);
};

export const isSame = (date1, date2, unit = "day") => {
    if (isDayjs(date1) && isDayjs(date2)) {
        return date1.isSame(date2, unit);
    }

    return false;
};
