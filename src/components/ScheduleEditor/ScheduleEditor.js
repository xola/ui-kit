import React, { Component, Fragment } from "react";
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import ScheduleSummary from "./ScheduleSummary";
import ScheduleEditorRow from "./ScheduleEditorRow";
import styles from "./ScheduleEditor.module.scss";
import WeekSelector from "./WeekSelector";
import { DatePicker, TimePicker } from "../..";
import TimeSlotSelector from "./TimeSlotSelector/TimeSlotSelector";
import TimeRangeSelector from "./TimeRangeSelector/TimeRangeSelector";
import * as _ from "lodash";

class ScheduleEditor extends Component {
    constructor(props) {
        super(props);
        const defaultScheduleEditorValues = {
            name: "",
            type: "available",
            repeat: "weekly",
            days: [0, 1, 2, 3, 4, 5, 6],
            dates: [],
            departure: "fixed",
            priceDelta: null,
            priceDeltaType: "",
            times: [],
            timeRanges: [],
        };
        this.state = {
            today: new Date(),
            price: this.props.price,
            schedule: _.extend(defaultScheduleEditorValues, JSON.parse(JSON.stringify(this.props.value))),
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
            <Form>
                <ScheduleEditorRow label="Name" for="scheduleName">
                    <Input
                        value={this.state.schedule.name}
                        onChange={(e) => this.handleChange(e.target.value, "name")}
                        className="w-75"
                        type="name"
                        name="scheduleName"
                        id="scheduleName"
                        placeholder="Name"
                    />
                </ScheduleEditorRow>
                <ScheduleEditorRow label="Availability">
                    <div className="form-check-inline" onChange={(e) => this.handleChange(e.target.value, "type")}>
                        <Input
                            type="radio"
                            name="type"
                            value="available"
                            checked={this.state.schedule.type === "available"}
                        />{" "}
                        Open &nbsp;
                        <Input
                            type="radio"
                            name="type"
                            value="unavailable"
                            checked={this.state.schedule.type === "unavailable"}
                        />{" "}
                        Blackout
                    </div>
                </ScheduleEditorRow>
                <ScheduleEditorRow label="Repeats">
                    <div className="form-check-inline" onChange={(e) => this.handleChange(e.target.value, "repeat")}>
                        <Input
                            type="radio"
                            name="repeat"
                            value="weekly"
                            checked={this.state.schedule.repeat === "weekly"}
                        />{" "}
                        Weekly &nbsp;
                        <Input
                            type="radio"
                            name="repeat"
                            value="custom"
                            checked={this.state.schedule.repeat === "custom"}
                        />{" "}
                        Custom
                    </div>
                </ScheduleEditorRow>
                {this.state.schedule.repeat === "weekly" && (
                    <ScheduleEditorRow label="Repeat on">
                        <WeekSelector name="days" selected={this.state.schedule.days} onChange={this.handleChange} />
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
                            <div
                                className="form-check-inline"
                                onChange={(e) => this.handleChange(e.target.value, "departure")}
                            >
                                <Input
                                    type="radio"
                                    name="departure"
                                    value="fixed"
                                    checked={this.state.schedule.departure === "fixed"}
                                />{" "}
                                Fixed Times &nbsp;
                                <Input
                                    type="radio"
                                    name="departure"
                                    value="varies"
                                    checked={this.state.schedule.departure === "varies"}
                                />{" "}
                                No Fixed Times
                            </div>
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
                        <span> untill </span>
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
                <ScheduleEditorRow label="Price">
                    <div className="form-check-inline">
                        <Input
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
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                name="pricedelta"
                                value={this.state.schedule.priceDelta}
                                onChange={(e) => this.handleChange(e.target.value, "priceDelta")}
                                name="priceDelta"
                            />
                        </InputGroup>
                    </div>
                </ScheduleEditorRow>
                <ScheduleEditorRow label="Summary">
                    <ScheduleSummary price={this.state.price} schedule={this.state.schedule} />
                </ScheduleEditorRow>
            </Form>
        );
    }
}

export default ScheduleEditor;
