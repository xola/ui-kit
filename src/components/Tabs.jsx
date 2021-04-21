import React from "react";
import clsx from "clsx";

export const Tabs = ({ tabs, className, tabClassName, ...rest }) => {
    if (!tabs) {
        throw new Error("Tabs are not defined. Please specify tabs property as an array of objects");
    }

    if (!Array.isArray(tabs)) {
        throw new Error("Tabs must be an array of objects");
    }

    return (
        <>
            <div className="sm:hidden">
                {/* For mobile devices */}
                <select
                    id="tabs"
                    name="tabs"
                    className={clsx("block w-full rounded-md border-gray focus:ring-primary focus:border-primary")}
                    defaultValue={tabs.find((tab) => tab.current || true).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className={clsx("hidden sm:block", className)}>
                <div className="border-b border-gray-light">
                    <nav className="flex -mb-px">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                onClick={tab.onClick ? tab.onClick : () => {}}
                                className={clsx(
                                    tab.current
                                        ? "border-primary text-black font-semibold"
                                        : "border-transparent  hover:text-gray-dark hover:font-semibold",
                                    "cursor-pointer w-1/4 py-2 px-1 text-center border-b-2 text-base",
                                    tabClassName,
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};
