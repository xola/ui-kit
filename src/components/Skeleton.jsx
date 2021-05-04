import clsx from "clsx";
import React from "react";

export const Skeleton = ({ width = "w-full", color = "bg-gray-light", children }) => {
    return (
        <div className="skeleton-container bg-white w-full h-80">
            <div className={clsx(width, "p-2")}>
                <div className="flex flex-col h-full relative w-full bg-white overflow-hidden card translate-3d-none-after card translate-3d-none-after rounded border border-gray-light">
                    <div className="relative h-full group text-black pt-[70%]">
                        <div className="absolute top-0 left-0 h-full w-full">
                            <span
                                className={clsx(
                                    color,
                                    "skeleton-box relative group-hover:scale-110 transition-transform transform-center block h-full",
                                )}
                            >
                                <div className="text-gray-dark uppercase text-md h-full flex items-center justify-center">{children}</div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
