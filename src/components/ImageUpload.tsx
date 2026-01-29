import React, { useRef, useState } from "react";
import cn from "../helpers/classnames";
import { Button, Logo, SubmitButton } from "..";
import { ImageIcon, TrashIcon } from "../icons";

type LogoSize = "small" | "medium" | "large";

export interface ImageUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size" | "onError"> {
    src?: string;
    size?: LogoSize;
    isLoading?: boolean;
    maxSize?: number;
    hasDelete?: boolean;
    requirements?: React.ReactNode | string | null;
    caption?: string | null;
    csvAcceptFormats?: string;
    onChange: (file: File) => void;
    onDelete: () => void;
    onError: (message: string) => void;
}

export const ImageUpload = ({
    src,
    size = "large",
    isLoading = false,
    maxSize = 5,
    hasDelete = true,
    requirements = null,
    caption = null,
    csvAcceptFormats = "image/png,image/jpeg",
    onChange,
    onDelete,
    onError,
    ...props
}: ImageUploadProps) => {
    const inputReference = useRef<HTMLInputElement>(null);
    const [inputKey, setInputKey] = useState(0);

    const handleUploadClick = () => {
        inputReference.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = event.target.files ?? [];

        if (!file) {
            return;
        }

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

    const hasRequirements = typeof requirements === "string" ? requirements?.trim().length > 0 : !!requirements;
    const hasCaption = caption ? caption.trim().length > 0 : false;

    return (
        <div className={cn("flex items-center rounded bg-gray-lighter p-4", hasDelete ? "space-x-2" : "space-x-3")}>
            <div>
                {src ? (
                    <Logo src={src} size={size} />
                ) : (
                    <div
                        className={cn(
                            Logo.sizes[size],
                            "flex items-center justify-center rounded border border-gray-light",
                        )}
                    >
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
                            <SubmitButton disabled={isLoading} isLoading={isLoading} onClick={handleUploadClick}>
                                {hasCaption ? caption!.trim() : "Upload New Photo"}
                            </SubmitButton>
                        </>
                    ) : (
                        <SubmitButton disabled={isLoading} isLoading={isLoading} onClick={handleUploadClick}>
                            {hasCaption ? caption!.trim() : src ? "Replace Photo" : "Upload New Photo"}
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
