import React from "react";
import { Accordion } from "../../components/Accordion/Accordion";

const AccordionStories = {
    title: "Data Display/Accordion",
    component: Accordion,
    parameters: {
        docs: {
            description: {
                component: "Accordions are collapsible content UI element",
            },
        }
    },
    args: {
        heading: "This is Accordion heading",
        headingClass: "text-xl",
        content: `Space, the final frontier. These are the voyages of the starship Enterprise. 
                Its five year mission: to explore strange new worlds, to seek out new life and
                new civilizations, to boldly go where no man has gone before!`,
        contentClass: "p1"
    },
    argTypes: {
        heading: {
            type: { required: false },
            description: "This is accordion heading",
            control: { type: "text" },
        },
        headingClass: {
            type: { required: false },
            control: { type: "text" },
            table: {
                type: { summary: "Classes for heading" },
            },
        },
        content: {
            type: { required: false },
            description: "This is body content",
            control: { type: "text" },
        },
        contentClass: {
            type: { required: false },
            control: { type: "text" },
            table: {
                type: { summary: "Classes for content"},
            },
        }
    },
};

export const Default = ({ children, heading, headingClass, content }) => {
    return (
        <Accordion>
            <Accordion.Header className={headingClass}>
                { heading }
            </Accordion.Header>
            <Accordion.Body>
                { content }
            </Accordion.Body>
        </Accordion>
    )
};

export default AccordionStories;