import React from "react";
import { NotificationCount } from "..";

const NotificationCountStories = {
    title: "Components/NotificationCount",
    component: NotificationCount,
};

export const Default = () => {
    return (
        <div className="space-x-4">
            <NotificationCount>0</NotificationCount>
            <NotificationCount>10</NotificationCount>
            <NotificationCount>999</NotificationCount>
        </div>
    );
};

export default NotificationCountStories;
