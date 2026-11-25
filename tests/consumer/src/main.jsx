import { createRoot } from "react-dom/client";
import { Button, Tooltip } from "@xola/ui-kit";
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";

createRoot(document.getElementById("root")).render(
    <Tooltip content="hint">
        <Button color="primary">x</Button>
    </Tooltip>,
);
