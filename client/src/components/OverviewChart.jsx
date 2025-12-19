import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api';

const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetSalesQuery();
    
    const [totalSalesLine, totalUnitsLine] = useMemo(()=> {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).reduce(
            (acc, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: month, y: curSales },
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: month, y: curUnits },
                ];

                return { sales: curSales, units: curUnits }

            },
            {sales: 0, units: 0}
        );
        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]);

    if (!data || isLoading) return "Loading...";
  return (
    <ResponsiveLine /* or Line for fixed dimensions */
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
        curve="monotoneX"
        enableArea={isDashboard}
        theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200]
                                }
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200]
                                }
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200]
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisBottom={{ 
            format: (v) => {
                if (isDashboard) return v.slice(0, 3);
                return v;
            },
            legend: isDashboard ? "" : "Month", 
            legendOffset: 36 
        }}
        axisLeft={{ 
            legend: isDashboard ? "" : `Total ${view === "sales" ? "Sales" : "Units"}`, 
            legendOffset: -60, 
            tickValues: 5

        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        enableGridX={false}  // removes vertical grid lines
        enableGridY={false}  // removes horizontal grid lines
        useMesh={true}
        legends={
            !isDashboard ? [
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 30,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 22,
                symbolShape: 'circle'
            }
        ]: undefined}
    />
  )
}

export default OverviewChart
