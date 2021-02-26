import React from "react";
import { Col, FormGroup, Label } from "reactstrap";
import classNames from "classnames";

const ScheduleEditorRow = (props) => {
    return (
        <FormGroup row>
            <Col className={classNames("d-flex py-1 align-items-center")} sm={2}>
                <Label className="font-14 m-0" for={props.for}>
                    {props.label}
                </Label>
            </Col>
            <Col className={classNames("font-14 d-flex py-1 align-items-center")} sm={8}>
                {props.children}
            </Col>
        </FormGroup>
    );
};

export default ScheduleEditorRow;
