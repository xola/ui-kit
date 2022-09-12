import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, ImageIcon, Logo, Spinner, TrashIcon } from "..";

export const ImageUpload = ({
    src,
    size = "large",
    onChange,
    onDelete,
    onError,
    isLoading = false,
    maxSize = 5,
    hasDelete = true,
    requirements = null,
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
                <div className="space-x-1">
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
                            {isLoading && <Spinner />}
                        </>
                    ) : (
                        <Button disabled={isLoading} onClick={handleUploadClick}>
                            {src ? "Replace Photo" : "Upload New Photo"}
                        </Button>
                    )}
                </div>
                <input
                    key={inputKey}
                    ref={inputReference}
                    className="hidden"
                    type="file"
                    multiple={false}
                    accept="image/png,image/jpeg"
                    onChange={handleChange}
                    {...props}
                />
                <div className="text-xs text-gray-darker">
                    {requirements ?? (
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
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    maxSize: PropTypes.number,
    hasDelete: PropTypes.bool,
    requirements: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
};
