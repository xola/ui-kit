import React, { Fragment } from "react";
import styles from "./TimeRangeSelector.module.scss";
import classNames from "classnames";
import { TimePicker } from "../../../";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TimeRangeSelector = (props) => {
    let timeRanges;
    if (props.values && props.values.length > 0) {
        timeRanges = props.values;
    } else {
        timeRanges = [{}];
    }

    const addNewRow = () => {
        timeRanges.push({ startTime: null, endTime: null });
        props.onChange(timeRanges, props.name);
    };

    const deleteRow = (event, index) => {
        timeRanges.splice(index, 1);
        props.onChange(timeRanges, props.name);
        event.preventDefault();
    };

    const handleChange = (value, index, key) => {
        timeRanges[index][key] = value;
        props.onChange(timeRanges, props.name);
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
                                onClick={(e) => deleteRow(e, index)}
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
                <a onClick={addNewRow} className={classNames("cursor-pointer d-block")}>
                    + add time range
                </a>
            </div>
        </Fragment>
    );
};

export default TimeRangeSelector;
