import { Tooltip } from "@xola/ui-kit";

interface TooltipSitesProps {
    isHintOn: boolean;
    isShown: boolean;
    hint: string;
}

export const TooltipSites = ({ isHintOn, isShown, hint }: TooltipSitesProps) => (
    <>
        <Tooltip open={isShown} content={hint} placement="right">
            <span>Status</span>
        </Tooltip>
        <Tooltip disabled={!isHintOn} content={hint} distance={18}>
            <span>Price</span>
        </Tooltip>
    </>
);
