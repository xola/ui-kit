export const findDayCell = (root, day) =>
    [...root.querySelectorAll("td[data-day]:not([data-outside])")].find(
        (cell) => cell.textContent.trim() === String(day),
    );

export const findDayButton = (root, day) => findDayCell(root, day)?.querySelector("button");
