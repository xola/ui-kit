import React from "react";
import { Col, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import classNames from "classnames";

const ScheduleEditorRow = ({ label, error, htmlFor, children }) => {
    console.log(error);
    return (
        <FormGroup row>
            <Col className={classNames("d-flex py-1 align-items-center")} sm={2}>
                <Label className="font-14 m-0" for={htmlFor}>
                    {label}
                </Label>
            </Col>
            <Col className={classNames("font-14 d-flex py-1 align-items-center")} sm={10}>
                {children}
            </Col>
            {error && (
                <Col sm={{ size: 12, offset: 2 }}>
                    <Input className="d-none" invalid />
                    <FormFeedback valid={false}> {error}</FormFeedback>
                </Col>
            )}
        </FormGroup>
    );
};

export default ScheduleEditorRow;
