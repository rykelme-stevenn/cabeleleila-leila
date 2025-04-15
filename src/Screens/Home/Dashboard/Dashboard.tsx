import { useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SchedulingType } from '../../../utils/types/types';
import { numberToWeekday, weekdayToNumber } from '../../../utils/functions';

const Dashboard = () => {
    const theme = useTheme();
    const scheduling = useSelector((state: RootState) => state.scheduling.schedulings)
    const [dataToGraph, setDataToGraph] = useState<Array<number>>([])
    const [dataMoneyToGraph, setDataMoneyToGraph] = useState<Array<number>>([])

    useEffect(() => {
        console.log(scheduling)
        handleGetSchedulingsByDay()
    }, [scheduling])

    function handleGetSchedulingsByDay() {
        console.log('veio', scheduling)
        let today = new Date()
        let sevenDaysAgo = new Date(today)
        sevenDaysAgo.setDate(today.getDate() - 7)

        let sevenDaysAgoSchedulings = scheduling.filter((item) => {
            let schedulingDate = new Date(item.year, item.month, item.day)
            console.log(schedulingDate >= sevenDaysAgo, schedulingDate, today)
            return (schedulingDate >= sevenDaysAgo) && (schedulingDate <= today)
        })
        transformData(sevenDaysAgoSchedulings)
        console.log(sevenDaysAgoSchedulings)
    }

    function transformData(schedulingsSevenDays: Array<SchedulingType>) {
        let data = []
        let dataMoney = []
        if (schedulingsSevenDays.length > 0) {
            for (let index = 0; index < 7; index++) {
                let count = schedulingsSevenDays.filter((item) => weekdayToNumber(item.weekday) === index)
                data.push(count.length)
                dataMoney.push(count.reduce((total, value) => {
                    return total + value.service.value;
                }, 0));
            }

            setDataToGraph(data)
            setDataMoneyToGraph(dataMoney)
        }
    }

    return (
        <div className="w-full p-4">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8">
                <div className="w-full lg:w-1/2">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], valueFormatter(value, context) {
                            return numberToWeekday(value)
                        } }]}
                        series={[
                            {
                                data: dataToGraph,
                                color: theme.palette.primary.main,
                                baseline: 'min',
                                label: 'Agendamentos/Dia',
                            },
                        ]}
                        height={300}
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], valueFormatter(value, context) {
                            return numberToWeekday(value)
                        }, }]}
                        yAxis={[{
                            valueFormatter(value, context) {
                                return `R$${value}`
                            }
                        }]}
                        series={[
                            {
                                data: dataMoneyToGraph,
                                color: theme.palette.secondary.main,
                                baseline: 'min',
                                label: 'Valor/Agendamentos',
                            },
                        ]}
                        height={300}
                    />
                </div>
            </div>
            <p className="text-base font-semibold text-center mt-6">Desempenho dos últimos 7 dias</p>
        </div>
    );
};

export default Dashboard;
