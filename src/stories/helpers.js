/* ---------------------------------------------------------------------------
 * argTypes
 * ------------------------------------------------------------------------ */

export const PLACEMENTS = ["top", "bottom", "left", "right", "auto"];
export const LOCALES = ["en-IN", "en-US", "fr-FR", "ja-JP", "de-DE", "ar-AE"];
export const COLORS = ["primary", "secondary", "success", "warning", "caution", "danger"];

export const arg = (defaultValue, type, options, description, summary = null) => {
    return {
        type: { required: false },
        description,
        options,
        control: { type },
        table: { type: { summary }, defaultValue: { summary: defaultValue } },
    };
};

export const selectArg = (options, defaultValue) => arg(defaultValue, "select", options, undefined);
