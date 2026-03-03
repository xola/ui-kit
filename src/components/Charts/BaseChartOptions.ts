import { merge } from "lodash";
import { theme } from "../../theme";

const { colors } = theme;

const fontStyle = {
    color: colors.gray.darker,
    fontSize: theme.fontSize.sm, // 12px
    fontWeight: 400,
    cursor: "pointer",
    textOverflow: "ellipsis",
    fontFamily: theme.extend.fontFamily.sans,
};

/**
 * This view sets up a Chart. A 'Chart' is anything Highcharts can render (graphs, pies, donuts etc)
 * This is the master file of defaults for Xola's charts. Colors, sizes, dimensions etc.
 */
export const BaseChartOptions = {
    global: {
        useUTC: false,
    },
    chart: {
        spacingLeft: 0,
    },
    colors: [
        colors.primary,
        colors.success,
        colors.warning,
        colors.caution,
        colors.danger,
        colors.blue.darker,
        colors.green.darker,
        colors.red.darker,
        colors.yellow.darker,
        colors.orange.darker,
    ],
    xAxis: {
        title: { style: merge({}, fontStyle, { color: colors.black }) },
        labels: { style: fontStyle },
    },
    yAxis: {
        title: { style: merge({}, fontStyle, { color: colors.black }) },
        labels: { style: fontStyle },
    },
    tooltip: {
        enabled: true,
        backgroundColor: colors.black,
        borderColor: colors.black,
        borderRadius: 4,
        borderWidth: 1,
        valueDecimals: 2,
        crosshairs: [true, true], // Show crosshairs when you browse over the toolips
        shadow: false,
        useHTML: true, // This is used to insert spans with classes for custom css
        style: merge({}, fontStyle, {
            opacity: 0.9,
            color: "#cccccc",
        }),
    },
    title: {
        text: "", // No title by default
        style: merge({}, fontStyle, { color: colors.black, fontSize: "18px", fontWeight: 600 }),
    },
    plotOptions: {
        series: {
            // Markers are not shown by default, except when you hover
            marker: {
                enabled: true,
                states: {
                    hover: {
                        enabled: true,
                        // Width and radius of the marker when you hover
                        lineWidth: 1,
                        radius: 4,
                    },
                },
            },
        },
    },
    legend: {
        enabled: false, // By default legend is disabled
        // The style applied to each item in the legend
        itemStyle: fontStyle,
        itemMarginBottom: 5,
        align: "center", // Center it in the chart canvas
        layout: "vertical", // Legend items are shown as a list
        borderWidth: 0,
    },
    credits: {
        // Don't show the 'Powered by Highcharts' text
        enabled: false,
    },
};
