import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const formatDate = (date, format = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
};

export const formatTime = (time, format = "h:mm a") => {
    const strTime = String(time).padStart(4, 0); // 700 to 0700
    return dayjs(strTime, "hhmm").format(format);
};
