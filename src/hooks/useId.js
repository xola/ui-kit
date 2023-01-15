import { useContext, useState } from "react";
import { Context } from "../components/Provider";

export const useId = (prefix) => {
    const { generateId } = useContext(Context);
    const [id] = useState(() => `${prefix}-${generateId()}`);
    return id;
};
