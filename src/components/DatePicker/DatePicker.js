import React, { Fragment, useEffect, useState } from "react";
import MultiDatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import classNames from "classnames";
import { DatePanel } from "react-multi-date-picker/plugins";
import styles from "./DatePicker.module.scss";
import { Button } from "../../";
import _ from "lodash";

const DatePicker = (props) => {
    const childProps = _.omit(props, ["onChange"]);
    const plugins = [];
    if (props.showDatePanel) {
        plugins.push(<DatePanel />);
    }

    const [value, setValue] = useState(props.value);

    function handleChange(value) {  
        let formattedValue;
        if (_.isArray(value)) {
            formattedValue = _.sortBy(_.map(value, (v) => v.format(childProps.format)));
        } else {
            formattedValue = value.format(childProps.format);
        }
        setValue(formattedValue);
        props.onChange(formattedValue);
    }

    function clearValue() {
        props.onChange(undefined);
    }

    return (
        <Fragment>
            {props.datePickerType === "datePicker" ? (
                <MultiDatePicker
                    onChange={handleChange}
                    value={value}
                    inputClass={styles.input}
                    {...childProps}
                    plugins={plugins}
                >
                    {childProps.clearButtonText && (
                        <div className={styles.footer}>
                            <Button color="primary" onClick={() => clearValue()} className={classNames(styles.clear)}>
                                {childProps.clearButtonText}
                            </Button>
                        </div>
                    )}
                </MultiDatePicker>
            ) : (
                <Calendar value={value} onChange={handleChange} {...childProps} plugins={plugins} />
            )}
        </Fragment>
    );
};

export default DatePicker;
