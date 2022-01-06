import React, { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Logo, Button, Spinner, ImageIcon, TrashIcon } from "..";

export const ImageUpload = ({
    src,
    size = "large",
    onChange,
    onDelete,
    onError,
    isLoading = false,
    maxSize = 5,
    ...props
}) => {
    const inputReference = useRef();

    const handleUploadClick = () => {
        inputReference.current.click();
    };

    const handleChange = (event) => {
        const [file] = event.target.files;

        if (maxSize && (1_000_000 * maxSize) < file.size) {
            onError(`Image size shouldn't exceed ${filesize(maxSize)}`);
            return;
        }

        onChange(file);
    };

    return (
        <div className="flex items-center rounded bg-gray-lighter p-4 space-x-8">
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
                    <Button
                        variant="outline"
                        color="secondary"
                        icon={<TrashIcon />}
                        disabled={isLoading}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                    <Button disabled={isLoading} onClick={handleUploadClick}>
                        Upload New Picture
                    </Button>
                    <input
                        ref={inputReference}
                        className="hidden"
                        type="file"
                        multiple={false}
                        accept="image/png,image/jpeg"
                        onChange={handleChange}
                        {...props}
                    />
                    {isLoading && <Spinner />}
                </div>
                <div className="text-xs text-gray-darker">
                    Check that the image is in PNG or JPG format
                    {maxSize ? ` and does not exceed ${maxSize}MB` : ""}
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
};
