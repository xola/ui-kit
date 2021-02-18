import React from "react";
import { Col, FormGroup, Label } from "reactstrap";

const ScheduleEditorRow = (props) => {
    return (
        <FormGroup row>
            <Col sm={4}>
                <Label className="float-right" for={props.for}>
                    {props.label}
                </Label>
            </Col>
            <Col sm={8}>{props.children}</Col>
        </FormGroup>
    );
};

export default ScheduleEditorRow;
