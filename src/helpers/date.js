import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(quarterOfYear);

export const formatDate = (date, format = "YYYY-MM-DD", timezoneName) => {
    const dateObj = dayjs.isDayjs(date) ? date : dayjs(date);
    const normalizedDate = timezoneName ? dateObj.tz(timezoneName) : dateObj;

    console.log(dateObj, normalizedDate)

    return normalizedDate.format(format);
};

export const formatTime = (time, format = "h:mm a") => {
    const stringTime = String(time).padStart(4, 0); // 700 to 0700
    return dayjs(stringTime, "hhmm").format(format);
};

export const dateFromObjectId = (id) => {
    return dayjs(new Date(Number.parseInt(id.slice(0, 8), 16) * 1000));
};
