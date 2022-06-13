/**
 * Sort an array of numbers in ascending order without mutating the original
 * array.
 * @param {number[]} numberArray
 * @returns {number[]}
 */
export const sortAsc = (numberArray) => [...numberArray].sort((a, b) => a - b);

/**
 * Convert a slider value to a percentage-based position.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} step
 * @returns {number}
 */
// export const valueToPosition = (value, min, max, step) => (value - min) / (max - min) * 100;
export const valueToPosition = (value, min, max, step) => {
    const position = ((value - min) / (max - min)) * 100;
    const nearbyStepPosition = Math.round(position / step) * step;
    return Math.round(nearbyStepPosition * 100) / 100;
};

/**
 * Convert a percentage-based position into a slider value.
 * @param {number} position
 * @param {number} min
 * @param {number} max
 * @param {number} step
 * @returns {number}
 */
// export const positionToValue = (position, min, max, step) => ((position / 100) * (max - min)) + min;
export const positionToValue = (position, min, max, step) => {
    const value = (position / 100) * (max - min) + min;
    const nearbyStepValue = Math.round(value / step) * step;
    return Number(nearbyStepValue.toFixed(countDecimals(step)));
};

export const countDecimals = (value) => {
    if (Math.floor(value) !== value) {
        const decimalCount = value.toString().split(".")[1].length;
        return decimalCount > 0 ? decimalCount : 0;
    }

    return 0;
};
