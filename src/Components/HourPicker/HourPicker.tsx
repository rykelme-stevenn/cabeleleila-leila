import { useEffect, useState } from "react";
import { CompleteDateType, CompleteHourType, SchedulingType, ServiceType } from "../../utils/types/types";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type HourPicker = {
    selectedDate: CompleteDateType,
    service: ServiceType,
    schedulingToEdit?: SchedulingType,
    selectHour: (value: CompleteHourType) => void
}

const HourPicker = ({ selectedDate, selectHour, service, schedulingToEdit }: HourPicker) => {
    const openHour = 9;
    const closeHour = 18;
    const [hoursVisible, setHoursVisible] = useState<Array<CompleteHourType>>([])
    const theme = useTheme()
    const schedulingsMade = useSelector((state: RootState ) => state.scheduling.schedulings)

    useEffect(() => {
        visibleHours()
    }, [schedulingsMade, selectedDate])

    function visibleHours() {
        let hoursX = []
        let hoursXGeneral = []
        let index = 0

        for (let hour = openHour; hour < closeHour; hour++) {
            console.log('here')
            if (hour === openHour) {

                !isHourlyUsed(hour, 0) && ( hoursX.push({
                    hour: hour,
                    minute: 0
                }) )
                hoursXGeneral.push({ hour: hour, minute: 0 })
            }
            let minutesTotal: number = (hoursXGeneral[index].hour * 60) + service.estimated_time + hoursXGeneral[index].minute
            let hoursToAdd = Math.floor(minutesTotal / 60)
            let minutesToAdd = minutesTotal - (hoursToAdd * 60)


            if (!isHourlyUsed(hoursToAdd, minutesToAdd)) {
                hoursX.push({ hour: hoursToAdd, minute: minutesToAdd })
            }
            hoursXGeneral.push({ hour: hoursToAdd, minute: minutesToAdd })
            index += 1

        }
        setHoursVisible(hoursX)
    }

    function isHourlyUsed(hoursToAdd: number, minutesToAdd: number) {
        const isUsed = schedulingToEdit ?schedulingsMade.some(s => s.service.id === service.id && s.day === selectedDate.day && s.hour === hoursToAdd && s.minute === minutesToAdd && s.id !== schedulingToEdit.id) : schedulingsMade.some(s => s.service.id === service.id && s.day === selectedDate.day && s.hour === hoursToAdd && s.minute === minutesToAdd);
        return (isUsed)
    }

    return (
        <div className="bg-white">
            {
                (hoursVisible && (hoursVisible?.length > 0)) && (
                    <div className="gap-3 grid grid-cols-4">
                        {
                            hoursVisible.map((hour) => (
                                <div className=" flex border border-spacing-1 rounded-md items-center justify-center p-4 cursor-pointer"
                                    style={{ borderColor: theme.palette.primary.main }}
                                    onClick={() => selectHour(hour)}
                                >
                                    <p>{hour.hour}:{hour.minute < 10 && '0'}{hour.minute}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default HourPicker