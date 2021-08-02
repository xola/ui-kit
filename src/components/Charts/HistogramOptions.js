import _ from "lodash";
import twConfig from "../../../tailwind.config";
import { BaseChartOptions, Colors } from "./BaseChartOptions";

/**
 * This is the base Histogram chart. A histogram can be a line, column or a bar view. This is the master file
 * for all defaults for a histogram. This should ideally be extended by business-specific implementations like
 * revenue graph, turnover etc.
 */
export const HistogramOptions = _.merge({}, BaseChartOptions, {
    chart: {
        type: "line",
    },
    title: {
        align: "left",
        margin: 20,
        verticalAlign: "top",
    },
    xAxis: {
        type: "datetime", // This will convert time into proper dates on the axis

        step: 1,
        minTickInterval: 24 * 3600 * 1000,
        lineColor: Colors.gray.darker,
        lineWidth: 1,
        gridLineWidth: "1",
        gridLineColor: "#DEDEDE",
        gridLineDashStyle: "dot",
    },
    yAxis: {
        lineColor: Colors.gray.darker,
        lineWidth: 1,
        gridLineWidth: "1",
        gridLineColor: "#DEDEDE",
        gridLineDashStyle: "dot",
    },
    plotOptions: {
        series: {
            // Markers are not shown by default, except when you hover
            marker: {
                enabled: true,
                lineWidth: 1,
                radius: 3,
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
        // By default legend is disabled
        enabled: false,
        // The style applied to each item in the legend
        itemStyle: {
            fontSize: "14px",
            color: "#666666",
            textTransform: "capitalize",
            fontFamily: twConfig.theme.extend.fontFamily.sans,
        },
        itemMarginBottom: 5,
        align: "center", // Center it in the chart canvas
        layout: "vertical", // Legend items are shown as a list
        borderWidth: 0,
    },
});
