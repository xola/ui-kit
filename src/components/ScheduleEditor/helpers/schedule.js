export const getScheduleDefaultValues = () => {
    return {
        name: "",
        type: "available",
        repeat: "weekly",
        days: [0, 1, 2, 3, 4, 5, 6],
        dates: [],
        departure: "fixed",
        priceDelta: "",
        priceDeltaType: "",
        times: [],
        timeRanges: [],
        allowedPrivacies: ["public", "private"],
    };
};
