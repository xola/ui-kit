import { range } from "lodash-es";
import React from "react";
import { Dot } from "./Dot";

export interface DotProgressProps {
    total: number;
    current: number;
}

export const DotProgress = ({ current, total }: DotProgressProps) => {
    if (total <= 1) {
        return null;
    }

    return (
        <div className="w-full space-x-2 text-center">
            {range(0, total).map((index) => {
                const currentValue = current <= 0 ? 0 : current >= total ? current - 1 : current;
                const color = index === currentValue ? "primary" : "secondary";
                return <Dot key={index} color={color} size="medium" />;
            })}
        </div>
    );
};
