import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

export const formatDate = (date, format = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
};

export const formatTime = (time, format = "h:mm a") => {
    const stringTime = String(time).padStart(4, 0); // 700 to 0700
    return dayjs(stringTime, "hhmm").format(format);
};

export const dateFromObjectId = (id: ID) => {
    return dayjs(new Date(Number.parseInt(id.slice(0, 8), 16) * 1000));
};