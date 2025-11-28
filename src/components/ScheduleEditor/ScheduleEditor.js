import React, { Fragment } from "react";
import { CustomInput, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import _ from "lodash";
import classNames from "classnames";
import ScheduleEditorRow from "./ScheduleEditorRow";
import { DatePicker } from "../..";
import WeekSelector from "./WeekSelector/WeekSelector";
import TimeSlotSelector from "./TimeSlotSelector/TimeSlotSelector";
import TimeRangeSelector from "./TimeRangeSelector/TimeRangeSelector";
import { getScheduleSummary } from "./helpers/scheduleSummary";
import { getScheduleDefaultValues } from "./helpers/schedule";

const ScheduleEditor = ({ value = {}, errors = {}, price = 0, isNew = true, onChange }) => {
    console.log("errors", errors);
    value = JSON.parse(JSON.stringify(value));
    if (value.dates?.length > 0) {
        value.dates = value.dates.map((date) => new Date(date));
    }
    if (value.start) {
        value.start = new Date(value.start);
    }
    if (value.end) {
        value.end = new Date(value.end);
    }
    const today = new Date();
    const defaultScheduleEditorValues = getScheduleDefaultValues();
    const schedule = _.extend(defaultScheduleEditorValues, value);

    const handleChange = (value, key) => {
        let updatedSchedule = { ...schedule };
        updatedSchedule[key] = value;
        onChange({ ...updatedSchedule, summary: getScheduleSummary(updatedSchedule) });
    };

    const handleAllowedPrivaciesChange = (privacy) => {
        let updatedPrivacies = [...schedule.allowedPrivacies];
        if (updatedPrivacies.includes(privacy)) {
            updatedPrivacies = updatedPrivacies.filter((p) => p !== privacy);
        } else {
            updatedPrivacies.push(privacy);
        }
        handleChange(updatedPrivacies, "allowedPrivacies");
    };

    return (
        <div>
            <ScheduleEditorRow label="Name" htmlFor="scheduleName">
                <Input
                    value={schedule.name}
                    onChange={(e) => handleChange(e.target.value, "name")}
                    className="w-50"
                    type="name"
                    name="scheduleName"
                    id="scheduleName"
                    placeholder="Daily"
                />
            </ScheduleEditorRow>
            <ScheduleEditorRow
                label="Allowed Privacies"
                htmlFor="allowedPrivacies"
                error={errors && errors.allowedPrivacies}
            >
                <div>
                    <CustomInput
                        inline
                        type="checkbox"
                        name="allowedPrivacies"
                        id="privacy-public"
                        label="Public"
                        value="public"
                        checked={schedule.allowedPrivacies.includes("public")}
                        onChange={(e) => handleAllowedPrivaciesChange("public")}
                    />
                    <CustomInput
                        inline
                        type="checkbox"
                        name="allowedPrivacies"
                        id="privacy-private"
                        label="Private"
                        value="private"
                        checked={schedule.allowedPrivacies.includes("private")}
                        onChange={(e) => handleAllowedPrivaciesChange("private")}
                    />
                </div>
                {/* {errors && errors.allowedPrivacies && (
                    <FormFeedback valid={false}> {errors.allowedPrivacies}</FormFeedback>
                )} */}
            </ScheduleEditorRow>
            <ScheduleEditorRow label="Availability">
                {isNew ? (
                    <div>
                        <CustomInput
                            inline
                            type="radio"
                            name="type"
                            id="type-available"
                            label="Open"
                            value="available"
                            checked={schedule.type === "available"}
                            onChange={(e) => handleChange(e.target.value, "type")}
                        />
                        <CustomInput
                            inline
                            type="radio"
                            name="type"
                            id="type-unavailable"
                            label="Blackout"
                            value="unavailable"
                            checked={schedule.type === "unavailable"}
                            onChange={(e) => handleChange(e.target.value, "type")}
                        />
                    </div>
                ) : (
                    <div className="pl-1">{schedule.type === "available" ? "Open" : "Blackout"}</div>
                )}
            </ScheduleEditorRow>
            <ScheduleEditorRow label="Repeats">
                {isNew ? (
                    <div>
                        <CustomInput
                            inline
                            type="radio"
                            name="repeat"
                            id="repeat-weekly"
                            label="Weekly"
                            value="weekly"
                            checked={schedule.repeat === "weekly"}
                            onChange={(e) => handleChange(e.target.value, "repeat")}
                        />
                        <CustomInput
                            inline
                            type="radio"
                            name="repeat"
                            id="repeat-custom"
                            label="Custom"
                            value="custom"
                            checked={schedule.repeat === "custom"}
                            onChange={(e) => handleChange(e.target.value, "repeat")}
                        />
                    </div>
                ) : (
                    <div className="pl-1">{schedule.repeat === "weekly" ? "Weekly" : "Custom"}</div>
                )}
            </ScheduleEditorRow>
            {schedule.repeat === "weekly" && (
                <ScheduleEditorRow error={errors && errors.days} label="Repeat on">
                    <WeekSelector name="days" value={schedule.days} onChange={handleChange} />
                </ScheduleEditorRow>
            )}
            {schedule.repeat === "custom" && (
                <ScheduleEditorRow error={errors && errors.dates} label="Select dates">
                    <DatePicker
                        isDatePicker={false}
                        isMultiple={true}
                        onChange={(dates) => handleChange(dates, "dates")}
                        value={schedule.dates}
                        datePickerType="calendar"
                        format="YYYY-MM-DD"
                    />
                </ScheduleEditorRow>
            )}
            {schedule.type === "available" && (
                <Fragment>
                    <ScheduleEditorRow label="Time Slots">
                        {isNew ? (
                            <div>
                                <CustomInput
                                    inline
                                    type="radio"
                                    name="departure"
                                    id="departure-fixed"
                                    label="Fixed Times"
                                    value="fixed"
                                    checked={schedule.departure === "fixed"}
                                    onChange={(e) => handleChange(e.target.value, "departure")}
                                />
                                <CustomInput
                                    inline
                                    type="radio"
                                    name="departure"
                                    id="departure-varies"
                                    label="No Fixed Times"
                                    value="varies"
                                    checked={schedule.departure === "varies"}
                                    onChange={(e) => handleChange(e.target.value, "departure")}
                                />
                            </div>
                        ) : (
                            <div className="pl-1">{schedule.departure === "fixed" ? "Fixed Times" : "No Varies"} </div>
                        )}
                    </ScheduleEditorRow>
                    {schedule.departure === "fixed" && (
                        <ScheduleEditorRow error={errors && errors.times} label="">
                            <TimeSlotSelector
                                name="times"
                                value={schedule.times}
                                onChange={(v) => handleChange(v, "times")}
                            />
                        </ScheduleEditorRow>
                    )}
                </Fragment>
            )}
            {schedule.type === "unavailable" && (
                <ScheduleEditorRow label="Time ranges">
                    <TimeRangeSelector
                        error={errors && errors.timeRanges}
                        name="timeRanges"
                        value={schedule.timeRanges}
                        onChange={(v) => handleChange(v, "timeRanges")}
                    />
                </ScheduleEditorRow>
            )}
            {schedule.repeat === "weekly" && (
                <ScheduleEditorRow label="Valid from">
                    <div>
                        <DatePicker
                            isDatePicker={true}
                            onChange={(v) => handleChange(v, "start")}
                            minDate={today}
                            maxDate={new Date(schedule.end)}
                            value={schedule.start ? new Date(schedule.start) : null}
                            format="dd MMM, yyyy"
                            placeholder="Now"
                            clearButtonText="Now"
                        />
                        <span className="mx-2"> until </span>
                        <DatePicker
                            isDatePicker={true}
                            onChange={(v) => handleChange(v, "end")}
                            minDate={new Date(schedule.start)}
                            value={schedule.end ? new Date(schedule.end) : null}
                            format="dd MMM, yyyy"
                            placeholder="Forever"
                            clearButtonText="Forever"
                        />
                    </div>
                </ScheduleEditorRow>
            )}
            {schedule.type === "available" && (
                <ScheduleEditorRow label="Price" error={errors && errors.priceDelta}>
                    <div className="w-75 form-check-inline">
                        <Input
                            className="w-50"
                            type="select"
                            value={schedule.priceDeltaType}
                            onChange={(e) => handleChange(e.target.value, "priceDeltaType")}
                            name="priceDeltaType"
                        >
                            <option value="">No change</option>
                            <option value="increase">Increase by</option>
                            <option value="decrease">Decrease by</option>
                        </Input>{" "}
                        &nbsp;
                        <InputGroup
                            className={classNames("w-50", {
                                invisible: schedule.priceDeltaType === "",
                            })}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-white">$</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="border-left-0"
                                type="text"
                                name="pricedelta"
                                value={schedule.priceDelta}
                                onChange={(e) => handleChange(e.target.value, "priceDelta")}
                                name="priceDelta"
                            />
                        </InputGroup>
                    </div>
                </ScheduleEditorRow>
            )}
            <ScheduleEditorRow label="Summary">
                <span>{getScheduleSummary(schedule, price)}</span>
            </ScheduleEditorRow>
        </div>
    );
};

export default ScheduleEditor;
