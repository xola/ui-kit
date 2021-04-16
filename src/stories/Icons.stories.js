import React from "react";
import { ChevronRightIcon, StarIcon, UserIcon } from "..";

export default {
    title: "Icons",
};

export const Default = () => {
    const icons = [<ChevronRightIcon />, <StarIcon />, <UserIcon />];
    return <div className="flex flex-row flex-wrap gap-8">{icons.map((icon, idx) => getIcon(icon, idx))}</div>;
};

const getIcon = (icon, idx) => {
    return (
        <div key={idx}>
            {icon}
            <div className="pt-3 text-gray-dark">{icon.type.displayName}</div>
        </div>
    );
};
