import React, { Component, Fragment } from "react";
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
import FormFeedback from "reactstrap/lib/FormFeedback";
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
            isNew: _.isUndefined(this.props.isNew) ? true : this.props.isNew,
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

    handlePriceDeltaType = (value, key) => {
        let schedule = { ...this.state.schedule };

        schedule[key] = value;

        if (!value) {
            schedule = _.omit(schedule, "priceDelta");
            this.props.onChange(schedule);
        }

        this.setState({
            schedule: schedule,
        });
    };

    render() {
        const { errors } = this.props;

        return (
            <div>
                <ScheduleEditorRow label="Name" htmlFor="scheduleName">
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
                    {(() => {
                        if (this.state.isNew) {
                            return (
                                <div>
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
                                </div>
                            );
                        } else {
                            if (this.state.schedule.type === "available") {
                                return <div className="pl-1">Open</div>;
                            } else {
                                return <div className="pl-1">Blackout</div>;
                            }
                        }
                    })()}
                </ScheduleEditorRow>
                <ScheduleEditorRow label="Repeats">
                    {(() => {
                        if (this.state.isNew) {
                            return (
                                <div>
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
                                </div>
                            );
                        } else {
                            if (this.state.schedule.repeat === "weekly") {
                                return <div className="pl-1">Weekly</div>;
                            } else {
                                return <div className="pl-1">Custom</div>;
                            }
                        }
                    })()}
                </ScheduleEditorRow>
                {this.state.schedule.repeat === "weekly" && (
                    <ScheduleEditorRow label="Repeat on">
                        <WeekSelector name="days" value={this.state.schedule.days} onChange={this.handleChange} />
                    </ScheduleEditorRow>
                )}
                {this.state.schedule.repeat === "custom" && (
                    <ScheduleEditorRow error={errors && errors.dates} label="Select dates">
                        <DatePicker
                            isDatePicker={false}
                            isMultiple={true}
                            onChange={(dates) => this.handleChange(dates, "dates")}
                            value={this.state.schedule.dates}
                            datePickerType="calendar"
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
                            {(() => {
                                if (this.state.isNew) {
                                    return (
                                        <div>
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
                                        </div>
                                    );
                                } else {
                                    if (this.state.schedule.departure === "fixed") {
                                        return <div className="pl-1">Fixed Times</div>;
                                    } else {
                                        return <div className="pl-1">No Varies</div>;
                                    }
                                }
                            })()}
                        </ScheduleEditorRow>
                        {this.state.schedule.departure === "fixed" && (
                            <ScheduleEditorRow error={errors && errors.times} label="">
                                <TimeSlotSelector
                                    name="times"
                                    value={this.state.schedule.times}
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
                            value={this.state.schedule.timeRanges}
                            onChange={(v) => this.handleChange(v, "timeRanges")}
                        />
                    </ScheduleEditorRow>
                )}
                <ScheduleEditorRow label="Valid from">
                    <div>
                        <DatePicker
                            isDatePicker={true}
                            onChange={(v) => this.handleChange(v, "from")}
                            minDate={this.state.today}
                            maxDate={new Date(this.state.schedule.to)}
                            value={this.state.schedule.from}
                            format="dd MMM, yyyy"
                            placeholder="Now"
                            clearButtonText="Now"
                        />
                        <span className="mx-2"> untill </span>
                        <DatePicker
                            isDatePicker={true}
                            onChange={(v) => this.handleChange(v, "to")}
                            minDate={new Date(this.state.schedule.from)}
                            value={this.state.schedule.to}
                            format="dd MMM, yyyy"
                            placeholder="Forever"
                            clearButtonText="Forever"
                        />
                    </div>
                </ScheduleEditorRow>
                {this.state.schedule.type === "available" && (
                    <ScheduleEditorRow label="Price" error={errors && errors.priceDelta}>
                        <div className="w-75 form-check-inline">
                            <Input
                                className="w-50"
                                type="select"
                                value={this.state.schedule.priceDeltaType}
                                onChange={(e) => this.handlePriceDeltaType(e.target.value, "priceDeltaType")}
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
