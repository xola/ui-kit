import React from "react";

const ScheduleSummary = (props) => {
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

    function getPriceDescription(basePrice, priceDelta, priceDeltaType) {
        if (priceDeltaType === "increase") {
            basePrice += parseFloat(priceDelta);
        } else if (priceDeltaType === "decrease") {
            basePrice -= parseFloat(priceDelta);
        }
        return ` for $ ${basePrice}`;
    }

    function generateSummary() {
        let schedule = { ...props.schedule };
        let price = props.price;
        let descriptionText = "";
        if (schedule.type === "available") {
            if (schedule.repeat === "weekly") {
                if (schedule.days.length === 7) {
                    descriptionText = "Daily";
                } else {
                    descriptionText = "Every " + getWeeklyDescription(schedule.days);
                }
            } else {
                if (schedule.dates.length === 0) {
                    descriptionText = "Custom dates (no dates selected)";
                } else {
                    descriptionText = "Occurs on " + getCustomDateDescription(schedule.dates);
                }
            }
        } else if (schedule.type === "unavailable") {
            descriptionText = "Blackout on";
        }
        return descriptionText + getPriceDescription(price, schedule.priceDelta, schedule.priceDeltaType);
    }

    return <span>{generateSummary()}</span>;
};

export default ScheduleSummary;
