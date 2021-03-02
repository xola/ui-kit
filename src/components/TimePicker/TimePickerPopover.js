import React, { useState } from "react";
import classNames from "classnames";
import { Container, Row, Button } from "reactstrap";
import styles from "./TimePickerPopover.module.scss";

const TimePickerPopover = ({ value, ...rest }) => {
    const hourArray = Array.from(Array(24).keys());
    const minuteArray = Array.from([...Array(12).keys()].map((m) => m * 5));
    let selectedValue = {};

    if (value && !isNaN(value)) {
        const inputValue = parseInt(value);
        selectedValue = {
            minute: inputValue % 100,
            hour: parseInt(inputValue / 100),
        };
    }

    const initialActions = {
        minute: false,
        hour: false,
    };

    const [actions, setActions] = useState(initialActions);

    const handleClick = (value, key) => {
        selectedValue[key] = value;
        if (!selectedValue.minute) {
            selectedValue.minute = 0;
        } else if (!selectedValue.hour) {
            selectedValue.hour = 0;
        }
        actions[key] = true;
        setActions(actions);
        rest.onChange(selectedValue.hour * 100 + selectedValue.minute);
        if (actions.hour && actions.minute) {
            rest.onClose();
        }
    };

    return (
        <Container className={classNames(styles.timepickerPopover, "position-absolute mt-1 ml-1 bg-white rounded p-3")}>
            <Row>
                <div className={styles.hourContainer}>
                    <div className="p-1 text-center">HOUR</div>
                    <div className={classNames(styles.content, "d-inline-block")}>
                        <div className={classNames(styles.meridian, "float-left text-center")}>
                            <p>AM</p>
                            <p>PM</p>
                        </div>
                        <div className={classNames(styles.hours, "float-left")}>
                            {hourArray.map((hour) => (
                                <Button
                                    key={hour}
                                    onClick={(e) => handleClick(hour, "hour")}
                                    className={classNames(
                                        styles.slotButton,
                                        "d-inline-flex align-items-center justify-content-center",
                                        {
                                            [`${styles.selected}`]: hour === selectedValue.hour,
                                        },
                                    )}
                                >
                                    {hour}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.minuteContainer}>
                    <div className="p-1 text-center">MINUTE</div>
                    <div className={classNames(styles.content, "d-inline-block")}>
                        <div className={classNames(styles.minutes, "float-left")}>
                            {minuteArray.map((minute) => (
                                <Button
                                    className={classNames(
                                        styles.slotButton,
                                        "rounded border-secondary d-inline-flex align-items-center justify-content-center",
                                        {
                                            [`${styles.selected}`]: minute === selectedValue.minute,
                                        },
                                    )}
                                    key={minute}
                                    onClick={(e) => handleClick(minute, "minute")}
                                >
                                    {minute < 10 ? "0" + minute : minute}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default TimePickerPopover;
