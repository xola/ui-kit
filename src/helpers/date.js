import dayjs from "dayjs";

export const formatDate = (date, format = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
};
