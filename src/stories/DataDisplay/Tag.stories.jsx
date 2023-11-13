import { Tag } from "../..";

const TagStories = {
    title: "Data Display/Tag",
    component: Tag,
    args: {},
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A60",
        },
    },
    argTypes: {
        text: {
            type: { required: true },
            control: { type: "text" },
        },
        color: {
            options: ["primary", "secondary"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
};

const onTagCloseClick = () => {
    console.log("Closed");
};

export const Default = {
    args: {
        color: "primary",
        size: "medium",
        children: "Listing: Kayaking in the Ganges",
        onClose: () => console.log("Closed"),
    },
};

export const BookingTag = {
    args: {
        color: "secondary",
        size: "small",
        children: "Listing: Kayaking in the Ganges",
        onClose: () => console.log("Closed"),
    },
};

export const SystemTag = {
    args: {
        color: "secondary",
        size: "small",
        children: "You cannot remove this tag",
    },
};

export default TagStories;
