export const findDayCell = (root, day) =>
    [...root.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)")].find(
        (cell) => cell.textContent.trim() === String(day),
    );
