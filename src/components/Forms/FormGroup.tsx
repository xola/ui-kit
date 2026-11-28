import type { ComponentPropsWithoutRef } from "react";
import cn from "../../helpers/classnames";

export const FormGroup = ({ className, ...rest }: ComponentPropsWithoutRef<"div">) => {
    return <div className={cn("ui-form-group", "mb-4", className)} {...rest} />;
};
