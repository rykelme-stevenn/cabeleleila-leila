import { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from "@mui/material";
import { CompleteDateType } from "../../utils/types/types";


type DayPickerProps = {
    selectedDay: CompleteDateType;
    selectDay: (day: CompleteDateType) => void;
}

export const DayPicker = ({ selectDay, selectedDay }: DayPickerProps) => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const theme = useTheme();

    const navigateDays = (direction: "prev" | "next") => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction === "prev" ? -4 : 4));
        setCurrentDate(newDate);
    };

    const generateVisibleDays = () => {
        const days = [];
        const tempDate = new Date(currentDate);

        for (let i = 0; i < 7; i++) {
            days.push({
                day: tempDate.getDate(),
                month: tempDate.getMonth(),
                year: tempDate.getFullYear(),
                weekday: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][tempDate.getDay()],
            });
            tempDate.setDate(tempDate.getDate() + 1);
        }
        return days;
    };

    const visibleDays = generateVisibleDays();

    const currentMonth = visibleDays[3].month;
    const currentYear = visibleDays[3].year;

    const monthName = new Date(currentYear, currentMonth).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });

    function compareDates(date: CompleteDateType) {
        return (date.day === selectedDay.day &&
            date.month === selectedDay.month &&
            date.year === selectedDay.year
        )
    }

    function invalidCurrentDate() {
        console.log(currentDate)
        let today = new Date()
        return (
            today.getFullYear() === currentDate.getFullYear() &&
            today.getMonth() === currentDate.getMonth() &&
            today.getDate() === currentDate.getDate()
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">

            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigateDays("prev")}
                    disabled={invalidCurrentDate()}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowBackIcon className="w-5 h-5" color={invalidCurrentDate() ? "disabled" : 'inherit'}/>
                </button>

                <h2 className="text-lg font-semibold capitalize">
                    {monthName}
                </h2>

                <button
                    onClick={() => navigateDays("next")}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowForwardIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">
                {visibleDays.map((day) => (
                    <div key={`${day.year}-${day.month}-${day.day}`}>
                        {day.weekday}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {visibleDays.map((day) => (
                    <div
                        key={`${day.year}-${day.month}-${day.day}`}
                        className={`h-12 flex items-center justify-center rounded-full border cursor-pointer
                        ${day.month !== currentMonth ? "text-gray-400" : "hover:bg-blue-50"}`}
                        onClick={() => selectDay(day)}
                        style={compareDates(day) ? { backgroundColor: theme.palette.primary.main, color: 'white' } : { backgroundColor: 'white' }}
                    >
                        {day.day}
                    </div>
                ))}
            </div>
        </div>
    );
};