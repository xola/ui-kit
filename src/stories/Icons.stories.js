import React from "react";
import { CheckIcon } from "..";
import { TrashIcon } from "..";

export default {
    title: "Icons",
};

export const Default = () => {
    return (
        <div>
            <div>
                CheckIcon <CheckIcon />
            </div>

            <div>
                TrashIcon <TrashIcon />
            </div>
        </div>
    );
};
