import clsx from "clsx";
import React from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { StarIcon } from "../icons/StarIcon";
import { XolaLogoCircle } from "../images/XolaLogoCircle";
import { Badge } from "./Badge";

export const SidebarLink = ({ active, icon: Icon, children, size = "small", ...rest }) => {
    return (
        <button
            className={clsx(
                "transition-colors leading-none flex items-center text-left w-full md:px-8 md:text-center py-3 rounded",
                {
                    "bg-primary text-white hover:bg-primary-dark": active,
                    "hover:bg-gray-darker text-gray": !active,
                },
            )}
            {...rest}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className="hidden md:inline">{children}</span>
            <ChevronRightIcon className="ml-auto w-3 h-3 hidden md:inline" />
        </button>
    );
};

export const Sidebar = () => {
    return (
        <div className="bg-black p-2 text-white h-screen w-24 md:w-56 overflow-y-auto">
            <div className="p-2 text-center md:text-left">
                <Badge className="text-sm" color="danger">
                    3
                </Badge>
            </div>

            <div className="text-center mb-10">
                <XolaLogoCircle className="inline-block w-12 h-12 md:w-24 md:h-24" />
            </div>

            <div className="space-y-2">
                <SidebarLink icon={StarIcon} active>
                    Hello
                </SidebarLink>

                <SidebarLink icon={StarIcon}>World</SidebarLink>
            </div>
        </div>
    );
};
