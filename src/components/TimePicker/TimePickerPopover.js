import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "./TimePickerPopover.module.scss";
import classNames from "classnames";

const TimePickerPopover = (props) => {
    const hourArray = Array.from(Array(24).keys());
    const minuteArray = Array.from([...Array(12).keys()].map((m) => m * 5));
    let initialValue = {};

    if (props.value && !isNaN(props.value)) {
        const inputValue = parseInt(props.value);
        initialValue = {
            minute: inputValue % 100,
            hour: parseInt(inputValue / 100),
        };
    }

    const initialActions = {
        minute: false,
        hour: false,
    };

    const [selectedValue, setSelectedValue] = useState(initialValue);
    const [actions, setActions] = useState(initialActions);

    const handleClick = (value, key) => {
        selectedValue[key] = value;
        if (!selectedValue.minute) {
            selectedValue.minute = 0;
        } else if (!selectedValue.hour) {
            selectedValue.hour = 0;
        }
        actions[key] = true;
        setSelectedValue(selectedValue);
        setActions(actions);
        props.onChange(selectedValue.hour * 100 + selectedValue.minute);
        if (actions.hour && actions.minute) {
            props.onClose();
        }
    };

    return (
        <Container className={styles["timepicker-popover"]}>
            <Row>
                <div className={styles["hour-container"]}>
                    <div className={styles["hour-heading"]}>HOUR</div>
                    <div className={styles["hour-content"]}>
                        <div className={styles.meridian}>
                            <p>AM</p>
                            <p>PM</p>
                        </div>
                        <div className={styles.hours}>
                            {hourArray.map((hour) => (
                                <Button
                                    key={hour}
                                    onClick={(e) => handleClick(hour, "hour")}
                                    className={classNames(styles.slotbutton, {
                                        [`${styles.selected}`]: hour === selectedValue.hour,
                                    })}
                                >
                                    {hour}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles["minute-container"]}>
                    <div className={styles["minute-heading"]}>MINUTE</div>
                    <div className={styles["minute-content"]}>
                        <div className={styles.minutes}>
                            {minuteArray.map((minute) => (
                                <Button
                                    className={classNames(styles.slotbutton, {
                                        [`${styles.selected}`]: minute === selectedValue.minute,
                                    })}
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
