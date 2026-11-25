import { Tooltip } from "@xola/ui-kit";

interface TooltipSitesProps {
    isHintOn: boolean;
    isShown: boolean;
    hint: string;
}

export const TooltipSites = ({ isHintOn, isShown, hint }: TooltipSitesProps) => (
    <>
        <Tooltip visible={isShown} content={hint} placement="right" appendTo={document.body}>
            <span>Status</span>
        </Tooltip>
        <Tooltip enabled={isHintOn} content={hint} offset={[0, 18]} zIndex={50} duration={500} trigger="mouseenter">
            <span>Price</span>
        </Tooltip>
    </>
);
