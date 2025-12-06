import { useContext, useState } from "react";
import { Context } from "../components/Provider";

// TODO: Can be removed once the project is upgraded to React 18
export const useId = (prefix: string): string => {
    const { generateId } = useContext(Context);
    const [id] = useState(() => `${prefix}-${generateId()}`);
    return id;
};
