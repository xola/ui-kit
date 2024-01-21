import { Tag } from "../..";
import { selectOptions, sizeParams } from "../helpers";
import { tagColors } from "../../components/Tag";

const TagStories = {
    title: "Data Display/Tag",
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A60",
        },
    },
    argTypes: {
        color: selectOptions(Object.keys(tagColors)),
        size: sizeParams,
    },
    args: {
        color: "primary",
        size: "medium",
        children: "Listing: Kayaking in the Ganges",
    },
};

export const Default = {};

export const BookingTag = {
    args: {
        color: "secondary",
        size: "small",
        children: "My tag",
        onClose: () => console.log("Closed"),
    },
};

export const SystemTag = {
    args: {
        color: "secondary",
        size: "small",
        children: "You cannot remove this tag",
        onClose: undefined,
    },
};

export default TagStories;
