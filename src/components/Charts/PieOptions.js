import _ from "lodash";
import { theme } from "../../theme";
import { BaseChartOptions } from "./BaseChartOptions";

export const PieOptions = _.merge({}, BaseChartOptions, {
    chart: {
        type: "pie",
    },
    tooltip: {
        pointFormat: "<b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
        pie: {
            size: 180,
            center: [80, 90],
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enabled: false,
            },
            showInLegend: true,
            innerSize: 110, // Donuts. Krispy Kreme 4tw
        },
    },
    legend: {
        enabled: true,
        maxHeight: 120,
        width: 220,
        navigation: {
            // This is the navigation for the legend. A scrollable list
            activeColor: theme.colors.gray.darker,
            animation: "true",
            style: theme.extend.fontFamily.sans,
        },
        padding: 5,
        backgroundColor: theme.colors.white, // For debugging
        itemMarginTop: 1,
        itemMarginBottom: 3,
        itemStyle: theme.extend.fontFamily.sans,
        style: { overflow: "hidden" },
        align: "left",
        layout: "horizontal",
        verticalAlign: "proximate",
        y: 240, // To get the legend to show right below the pie
    },
    credits: {
        // Don't show the 'Powered by Highcharts' text
        enabled: false,
    },
});
