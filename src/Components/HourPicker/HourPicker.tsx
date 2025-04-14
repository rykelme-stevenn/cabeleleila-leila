import { useEffect, useState } from "react";
import { CompleteDate, CompleteHour, Scheduling } from "../../utils/types/types";
import { useTheme } from "@mui/material";
import { getSchedulings } from "../../service/operational";

type HourPicker = {
    selectedDate: CompleteDate,
    selectHour: (value: CompleteHour) => void;
}

const HourPicker = ({ selectedDate, selectHour }: HourPicker) => {
    const openHour = 9;
    const closeHour = 18;
    const [hours, setHours] = useState<Array<CompleteHour>>([])
    const [ schedulingsMade, setSchedulingsMade ] = useState<Array<Scheduling>>([])
    const theme = useTheme()

    useEffect(() => {
        getStoreSchedulings()
        visibleHours()
    }, [selectedDate])

    async function getStoreSchedulings(){
        let response = await getSchedulings();
        if(response){
            setSchedulingsMade(response)
        }
    }

    function visibleHours() {
        let hoursX = []
        for (let hour = openHour; hour <= closeHour; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const isUsed = schedulingsMade.some(s => s.hour === hour && s.minute === minute);
                if(!isUsed){
                    hoursX.push({hour: hour, minute: minute})
                }   
            }
        }
        setHours(hoursX)
    }

    return (
        <div className="bg-white">
            {
                (hours && (hours?.length > 0)) && (
                    <div className="gap-3 grid grid-cols-4">
                        {
                            hours.map((hour) => (
                                <div className=" flex border border-spacing-1 rounded-md items-center justify-center p-4"
                                style={{borderColor: theme.palette.primary.main}}
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