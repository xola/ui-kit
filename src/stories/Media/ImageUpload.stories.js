import React from "react";
import { ImageUpload } from "../..";

const ImageUploadStories = {
    title: "Media/Image Upload",
    component: ImageUpload,
    parameters: {
        docs: {
            description: {
                component: "Use to upload images",
            },
        },
    },
    args: {
        size: "medium",
        maxSize: 5,
    },
    argTypes: {
        src: {
            type: { required: true },
            description: "The URL to the image",
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
        isLoading: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
        maxSize: {
            description: "Max file size",
            control: { type: "number" },
        },
    },
};

export const Default = ({ src: source, size = "small", maxSize, isLoading }) => {
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

    return (
        <ImageUpload
            src={source_}
            size={size}
            isLoading={isLoading}
            maxSize={maxSize}
            onChange={onChange}
            onDelete={onDelete}
            onError={(error) => console.log(error)}
        />
    );
};

export default ImageUploadStories;
