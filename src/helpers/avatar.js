export const getInitials = (name) => {
    let initials = "N/A";

    if (typeof name === "string" && name.trim().length > 0) {
        const sanitizedName = name.replace(/[^a-z0-9\s]/i, "").trim();
        const pieces = sanitizedName.split(" ");
        initials = pieces[0].slice(0, 1);

        if (pieces.length > 1) {
            initials += pieces[pieces.length - 1].slice(0, 1);
        }
    }

    return initials.toUpperCase();
};
