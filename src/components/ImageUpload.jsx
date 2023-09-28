import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Button, ImageIcon, Logo, SubmitButton, TrashIcon } from "..";

export const ImageUpload = ({
    src,
    size = "large",
    isLoading = false,
    maxSize = 5,
    hasDelete = true,
    requirements = null,
    csvAcceptFormats = "image/png,image/jpeg",
    onChange,
    onDelete,
    onError,
    ...props
}) => {
    const inputReference = useRef();
    const [inputKey, setInputKey] = useState(0);

    const handleUploadClick = () => {
        inputReference.current.click();
    };

    const handleChange = (event) => {
        const [file] = event.target.files;

        if (maxSize && 1_048_576 * maxSize < file.size) {
            onError(`Image size shouldn't exceed ${maxSize}MB`);
            return;
        }

        onChange(file);
    };

    const handleDelete = () => {
        // while deleting the input should be emptied - this increment cause input to be replaced for a new one
        setInputKey(inputKey + 1);
        onDelete();
    };

    const hasRequirements = requirements?.trim().length > 0;

    return (
        <div className="flex items-center space-x-8 rounded bg-gray-lighter p-4">
            <div>
                {src ? (
                    <Logo src={src} size={size} />
                ) : (
                    <div className={clsx(Logo.sizes[size], "flex items-center justify-center")}>
                        <ImageIcon size="large" className="text-gray" />
                    </div>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <div className="space-x-2">
                    {hasDelete ? (
                        <>
                            <Button
                                variant="outline"
                                color="secondary"
                                icon={<TrashIcon />}
                                disabled={isLoading}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button disabled={isLoading} onClick={handleUploadClick}>
                                Upload New Picture
                            </Button>
                        </>
                    ) : (
                        <SubmitButton disabled={isLoading} isLoading={isLoading} onClick={handleUploadClick}>
                            {src ? "Replace Photo" : "Upload New Photo"}
                        </SubmitButton>
                    )}
                </div>
                <input
                    key={inputKey}
                    ref={inputReference}
                    className="hidden"
                    type="file"
                    multiple={false}
                    accept={csvAcceptFormats}
                    onChange={handleChange}
                    {...props}
                />
                <div className="text-xs text-gray-darker">
                    {hasRequirements ? (
                        requirements
                    ) : (
                        <div>
                            Check that the image is in PNG or JPG format
                            {maxSize ? ` and does not exceed ${maxSize}MB` : ""}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ImageUpload.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    isLoading: PropTypes.bool,
    maxSize: PropTypes.number,
    hasDelete: PropTypes.bool,
    csvAcceptFormats: PropTypes.string,
    requirements: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};
