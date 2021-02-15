import React, { useState, Fragment } from "react";
import { Row } from "reactstrap";
import styles from "./TimeRangeSelector.module.scss";
import { TimePicker } from "../../../";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TimeRangeSelector = (props) => {
    let selectedTimeRanges;
    if (props.values && props.values.length > 0) {
        selectedTimeRanges = props.values;
    } else {
        selectedTimeRanges = [{}];
    }
    const [timeRanges, setTimeRanges] = useState(selectedTimeRanges);

    const addNewRow = () => {
        let newTimeRange = { startTime: null, endTime: null };
        let existingRows = [...timeRanges];
        existingRows.push(newTimeRange);
        setTimeRanges(existingRows);
    };

    const deleteRow = (event, index) => {
        let currentTimeRanges = [...timeRanges];
        currentTimeRanges.splice(index, 1);
        setTimeRanges(currentTimeRanges);
        event.preventDefault();
    };

    const handleChange = (value, index, key) => {
        let currentTImeRanges = [...timeRanges];
        currentTImeRanges[index][key] = value;
        setTimeRanges(currentTImeRanges);
    };

    return (
        <Fragment>
            <div>
                {timeRanges.map((timeRange, index) => (
                    <Row xs={12} key={index}>
                        <div className={classNames("form-check-inline", styles["timerange-row"])}>
                            <span className={styles["timerange-label"]}>Start Time</span>
                            <span className={styles["timerange-timepicker"]}>
                                <TimePicker
                                    value={timeRange.startTime}
                                    onChange={(v) => handleChange(v, index, "startTime")}
                                />
                            </span>

                            <span className={styles["timerange-label"]}>End Time</span>
                            <span className={styles["timerange-timepicker"]}>
                                <TimePicker
                                    value={timeRange.endTime}
                                    onChange={(v) => handleChange(v, index, "endTime")}
                                />
                            </span>
                            <span onClick={(e) => deleteRow(e, index)} className={styles["timerange-delete"]}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </div>
                    </Row>
                ))}
            </div>

            <a onClick={addNewRow} className={styles["add-new-row"]}>
                + add time range
            </a>
        </Fragment>
    );
};

export default TimeRangeSelector;
