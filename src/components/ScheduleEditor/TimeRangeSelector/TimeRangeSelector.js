import React, { Fragment } from "react";
import styles from "./TimeRangeSelector.module.scss";
import classNames from "classnames";
import { TimePicker } from "../../../";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TimeRangeSelector = ({ value, name, ...rest }) => {
    let timeRanges;
    if (value && value.length > 0) {
        timeRanges = value;
    } else {
        timeRanges = [{}];
    }

    const handleAddNewRow = () => {
        timeRanges.push({ startTime: null, endTime: null });
        rest.onChange(timeRanges, name);
    };

    const handleDeleteRow = (event, index) => {
        timeRanges.splice(index, 1);
        rest.onChange(timeRanges, name);
        event.preventDefault();
    };

    const handleChange = (value, index, key) => {
        timeRanges[index][key] = value;
        rest.onChange(timeRanges, name);
    };

    return (
        <Fragment>
            <div>
                <div className="d-block">
                    {timeRanges.map((timeRange, index) => (
                        <div key={index} className={classNames("d-flex mb-2", styles.row)}>
                            <span className="mr-2">Start Time</span>
                            <span className="mr-4">
                                <TimePicker
                                    value={timeRange.startTime}
                                    onChange={(v) => handleChange(v, index, "startTime")}
                                />
                            </span>
                            <span className="mr-2">End Time</span>
                            <span className="mr-4">
                                <TimePicker
                                    value={timeRange.endTime}
                                    onChange={(v) => handleChange(v, index, "endTime")}
                                />
                            </span>
                            <span
                                onClick={(e) => handleDeleteRow(e, index)}
                                className={classNames(
                                    styles.delete,
                                    "cursor-pointer ml-2 text-center p-1 rounded-circle bg-danger text-white",
                                )}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </div>
                    ))}
                </div>
                <a onClick={handleAddNewRow} className={classNames("cursor-pointer d-block")}>
                    + add time range
                </a>
            </div>
        </Fragment>
    );
};

export default TimeRangeSelector;
