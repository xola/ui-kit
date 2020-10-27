import { Button } from "..";
import React from "react";

export default {
    title: "Button",
    component: Button,
};

export const Default = () => {
    return <Button>Default</Button>;
};

export const Colors = () => {
    return (
        <div>
            <Button color="primary">Primary</Button> <Button color="secondary">Secondary</Button>{" "}
            <Button color="success">Success</Button> <Button color="info">Info</Button>{" "}
            <Button color="warning">Warning</Button> <Button color="danger">Danger</Button>{" "}
            <Button color="link">Link</Button>{" "}
        </div>
    );
};

export const Outlined = () => {
    return (
        <div>
            <Button color="primary" outline>
                Primary
            </Button>{" "}
            <Button color="secondary" outline>
                Secondary
            </Button>{" "}
            <Button color="success" outline>
                Success
            </Button>{" "}
            <Button color="info" outline>
                Info
            </Button>{" "}
            <Button color="warning" outline>
                Warning
            </Button>{" "}
            <Button color="danger" outline>
                Danger
            </Button>{" "}
            <Button color="link" outline>
                Link
            </Button>
        </div>
    );
};

export const Sizes = () => {
    return (
        <div>
            <Button size="sm" color="primary">
                Small
            </Button>{" "}
            <Button size="md" color="secondary">
                Medium
            </Button>{" "}
            <Button size="lg" color="success">
                Large
            </Button>
        </div>
    );
};
