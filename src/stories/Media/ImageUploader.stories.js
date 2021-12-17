import React from "react";
import { ImageUploader } from "../..";

const ImageUploaderStories = {
    title: "Media/ImageUploader",
    component: ImageUploader,
    parameters: {
        docs: {
            description: {
                component: "Use to upload images",
            },
        },
    },
    args: {
        size: "medium",
    },
    argTypes: {
        src: {
            type: { required: true },
            description: "The URL to the logo",
            control: {
                type: "text",
            },
            table: {
                type: { summary: null },
                defaultValue: { summary: "none" },
            },
        },
        size: {
            description: "The size of the image",
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
        },
    },
};

export const Default = ({ src: source = "http://placekitten.com/300/300", size = "small" }) => {
    const [source_, setSource] = React.useState(source);

    React.useEffect(() => {
        setSource(source);
    }, [setSource, source]);

    const onChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            setSource(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const onDelete = () => {
        setSource(undefined);
    };

    return <ImageUploader src={source_} size={size} onChange={onChange} onDelete={onDelete} />;
};

export default ImageUploaderStories;
