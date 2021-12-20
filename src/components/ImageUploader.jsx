import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Logo, Button } from "..";

const DEFAULT_IMAGE = "https://via.placeholder.com/300.png?text=No+Image";

export const ImageUploader = ({ src, size, onChange, onDelete, ...rest }) => {
    const inputReference = useRef();

    const handleUploadClick = () => {
        inputReference.current.click();
    };

    const handleChange = (event) => {
        const [file] = event.target.files;
        onChange(file);
    };

    return (
        <div className="flex items-center bg-gray-lighter p-4 space-x-8">
            <div>
                <Logo src={src || DEFAULT_IMAGE} size={size} />
            </div>
            <div className="flex flex-col space-y-2">
                <div className="space-x-1">
                    <Button variant="outline" color="secondary" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button onClick={handleUploadClick}>Upload New Picture</Button>
                    <input
                        ref={inputReference}
                        className="hidden"
                        type="file"
                        multiple={false}
                        accept="image/png,image/jpeg"
                        onChange={handleChange}
                        {...rest}
                    />
                </div>
                <div className="text-xs text-gray-darker">
                    Check that the image is in PNG or JPG format and does not exceed 5 MB
                </div>
            </div>
        </div>
    );
};

ImageUploader.defaulpProps = {
    src: "",
    size: "large",
};

ImageUploader.propTypes = {
    src: PropTypes.string,
    size: PropTypes.any,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
};
