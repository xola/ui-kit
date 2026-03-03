export const getInitials = (name?: string): string => {
    let initials = "N/A";
    const pieces = typeof name === "string" && name.match(/\b\w/g);

    if (pieces) {
        initials = pieces[0];

        if (pieces.length > 1) {
            initials += pieces.at(-1);
        }
    }

    return initials.toUpperCase();
};
