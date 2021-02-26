import React, { Component, Fragment } from "react";
import { CustomInput, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import * as _ from "lodash";
import classNames from "classnames";
import ScheduleEditorRow from "./ScheduleEditorRow";
import { DatePicker } from "../..";
import WeekSelector from "./WeekSelector/WeekSelector";
import TimeSlotSelector from "./TimeSlotSelector/TimeSlotSelector";
import TimeRangeSelector from "./TimeRangeSelector/TimeRangeSelector";
import { getScheduleSummary } from "./helpers/scheduleSummary";
import { getScheduleDefaultValues } from "./helpers/schedule";
class ScheduleEditor extends Component {
    constructor(props) {
        super(props);
        const defaultScheduleEditorValues = getScheduleDefaultValues();
        const value = this.props.value ? JSON.parse(JSON.stringify(this.props.value)) : {};
        if (value.priceDelta < 0) {
            value.priceDelta = 0 - value.priceDelta;
            value.priceDeltaType = "decrease";
        } else if (value.priceDelta > 0) {
            value.priceDeltaType = "increase";
        }
        this.state = {
            today: new Date(),
            price: this.props.price ? this.props.price : 0,
            schedule: _.extend(defaultScheduleEditorValues, value),
        };
    }

    handleChange = (value, key) => {
        let schedule = { ...this.state.schedule };
        schedule[key] = value;
        this.setState({
            schedule: schedule,
        });
        if (this.props.onChange) {
            this.props.onChange(schedule);
        }
    };

    render() {
        return (
            <div>
                <ScheduleEditorRow label="Name" for="scheduleName">
                    <Input
                        value={this.state.schedule.name}
                        onChange={(e) => this.handleChange(e.target.value, "name")}
                        className="w-50"
                        type="name"
                        name="scheduleName"
                        id="scheduleName"
                        placeholder="sm"
                        placeholder="Daily"
                    />
                </ScheduleEditorRow>
                <ScheduleEditorRow label="Availability">
                    <CustomInput
                        inline
                        type="radio"
                        name="type"
                        id="type-available"
                        label="Open"
                        value="available"
                        checked={this.state.schedule.type === "available"}
                        onChange={(e) => this.handleChange(e.target.value, "type")}
                    />
                    <CustomInput
                        inline
                        type="radio"
                        name="type"
                        id="type-unavailable"
                        label="Blackout"
                        value="unavailable"
                        checked={this.state.schedule.type === "unavailable"}
                        onChange={(e) => this.handleChange(e.target.value, "type")}
                    />
                </ScheduleEditorRow>
                <ScheduleEditorRow label="Repeats">
                    <CustomInput
                        inline
                        type="radio"
                        name="repeat"
                        id="repeat-weekly"
                        label="Weekly"
                        value="weekly"
                        checked={this.state.schedule.repeat === "weekly"}
                        onChange={(e) => this.handleChange(e.target.value, "repeat")}
                    />
                    <CustomInput
                        inline
                        type="radio"
                        name="repeat"
                        id="repeat-custom"
                        label="Custom"
                        value="custom"
                        checked={this.state.schedule.repeat === "custom"}
                        onChange={(e) => this.handleChange(e.target.value, "repeat")}
                    />
                </ScheduleEditorRow>
                {this.state.schedule.repeat === "weekly" && (
                    <ScheduleEditorRow label="Repeat on">
                        <WeekSelector name="days" value={this.state.schedule.days} onChange={this.handleChange} />
                    </ScheduleEditorRow>
                )}
                {this.state.schedule.repeat === "custom" && (
                    <ScheduleEditorRow label="Select dates">
                        <DatePicker
                            onChange={(dates) => this.handleChange(dates, "dates")}
                            value={this.state.schedule.dates}
                            datePickerType="calendar"
                            multiple={true}
                            format="YYYY-MM-DD"
                        />
                    </ScheduleEditorRow>
                )}
                {this.state.schedule.type === "available" && (
                    <Fragment>
                        <ScheduleEditorRow label="Time Slots">
                            {/* <div
                                className="form-check-inline"
                                onChange={(e) => this.handleChange(e.target.value, "departure")}
                            > */}
                            <CustomInput
                                inline
                                type="radio"
                                name="departure"
                                id="departure-fixed"
                                label="Fixed Times"
                                value="fixed"
                                checked={this.state.schedule.departure === "fixed"}
                                onChange={(e) => this.handleChange(e.target.value, "departure")}
                            />
                            <CustomInput
                                inline
                                type="radio"
                                name="departure"
                                id="departure-varies"
                                label="No Fixed Times"
                                value="varies"
                                checked={this.state.schedule.departure === "varies"}
                                onChange={(e) => this.handleChange(e.target.value, "departure")}
                            />
                        </ScheduleEditorRow>
                        {this.state.schedule.departure === "fixed" && (
                            <ScheduleEditorRow label="">
                                <TimeSlotSelector
                                    name="times"
                                    values={this.state.schedule.times}
                                    onChange={(v) => this.handleChange(v, "times")}
                                />
                            </ScheduleEditorRow>
                        )}
                    </Fragment>
                )}
                {this.state.schedule.type === "unavailable" && (
                    <ScheduleEditorRow label="Time ranges">
                        <TimeRangeSelector
                            name="timeRanges"
                            values={this.state.schedule.timeRanges}
                            onChange={(v) => this.handleChange(v, "timeRanges")}
                        />
                    </ScheduleEditorRow>
                )}
                <ScheduleEditorRow label="Valid from">
                    <div>
                        <DatePicker
                            onChange={(v) => this.handleChange(v, "from")}
                            datePickerType="datePicker"
                            minDate={this.state.today}
                            maxDate={new Date(this.state.schedule.to)}
                            editable={false}
                            value={this.state.schedule.from}
                            format="DD MMM, YYYY"
                            placeholder="Now"
                            clearButtonText="Now"
                        />
                        <span className="mx-2"> untill </span>
                        <DatePicker
                            onChange={(v) => this.handleChange(v, "to")}
                            datePickerType="datePicker"
                            editable={false}
                            minDate={new Date(this.state.schedule.from)}
                            value={this.state.schedule.to}
                            format="DD MMM, YYYY"
                            placeholder="Forever"
                            clearButtonText="Forever"
                        />
                    </div>
                </ScheduleEditorRow>
                {this.state.schedule.type === "available" && (
                    <ScheduleEditorRow label="Price">
                        <div className="w-75 form-check-inline">
                            <Input
                                className="w-50"
                                type="select"
                                value={this.state.schedule.priceDeltaType}
                                onChange={(e) => this.handleChange(e.target.value, "priceDeltaType")}
                                name="priceDeltaType"
                            >
                                <option value="">No change</option>
                                <option value="increase">Increase by</option>
                                <option value="decrease">Decrease by</option>
                            </Input>{" "}
                            &nbsp;
                            <InputGroup
                                className={classNames("w-50", {
                                    invisible: this.state.schedule.priceDeltaType === "",
                                })}
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="bg-white">$</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    className="border-left-0"
                                    type="text"
                                    name="pricedelta"
                                    value={this.state.schedule.priceDelta}
                                    onChange={(e) => this.handleChange(e.target.value, "priceDelta")}
                                    name="priceDelta"
                                />
                            </InputGroup>
                        </div>
                    </ScheduleEditorRow>
                )}
                <ScheduleEditorRow label="Summary">
                    <span>{getScheduleSummary(this.state.schedule, this.state.price)}</span>
                </ScheduleEditorRow>
            </div>
        );
    }
}

export default ScheduleEditor;
