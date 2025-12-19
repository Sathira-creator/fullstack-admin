import React, {useMemo} from 'react';
import {Box, useTheme} from '@mui/material';
import Header from 'components/Header';
import OverviewChart from 'components/OverviewChart';
import { useGetSalesQuery } from 'state/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from '@nivo/line';

const Monthly = () => {
    
    const { data } = useGetSalesQuery();
    const theme = useTheme();

    const formattedData = useMemo(() => {
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

        Object.values(monthlyData).forEach(
            ({ month, totalSales, totalUnits }) => {

                    totalSalesLine.data = [
                        ...totalSalesLine.data,
                        { x: month, y: totalSales },
                    ];
                    totalUnitsLine.data = [
                        ...totalUnitsLine.data,
                        { x: month, y: totalUnits },
                    ];
                
            },
            
        );
        return [totalSalesLine,totalUnitsLine];

    }, [data])

  return (

    <Box m="1.5rem 2.5rem">
        <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />

        <Box height="75vh">

        {data ? (
                <ResponsiveLine 
                    data={formattedData}
                    curve="monotoneX"
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
                    colors={{ datum: 'color' }}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                    axisBottom={{ 
                        legend: "Month", 
                        legendOffset: 36 
                    }}
                    axisLeft={{ 
                        legend: "Total", 
                        legendOffset: -60 
            
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
                        [
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            translateX: 50,
                            translateY: 0,
                            itemWidth: 80,
                            itemHeight: 22,
                            symbolShape: 'circle'
                        }
                    ]}
                />
        ) : <>"Loading..."</>}

        </Box>
      
    </Box>
  )
}

export default Monthly
