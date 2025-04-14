import { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { DayPicker } from '../../Components/DayPicker/DayPicker';
import HourPicker from '../../Components/HourPicker/HourPicker';
import { CompleteDateType, CompleteHourType, SchedulingType, ServiceType } from '../../utils/types/types';
import ModalConfirmScheduling from '../../Components/Modals/ModalConfirmScheduling/ModalConfirmScheduling';
import { useLocation } from 'react-router-dom';
import { getSchedulings } from '../../service/operational';


const Scheduling = () => {
    const [selectedDay, setSelectedDay] = useState<CompleteDateType>({
        day: 0,
        month: 0,
        year: 0,
        weekday: ''
    })
    const [selectedHour, setSelectedHour] = useState<CompleteHourType>({
        hour: 0,
        minute: 0
    })
    const [openedConfirmScheduling, setOpenedConfirmScheduling] = useState(false)
    const serviceSelected: ServiceType = useLocation().state?.service;
    const [schedulingsMade, setSchedulingsMade] = useState<Array<SchedulingType>>([])

    useEffect(() => {
        getStoreSchedulings()
    }, [])

    async function getStoreSchedulings() {
        let response = await getSchedulings();
        if (response) {
            setSchedulingsMade(response)
        }
    }

    return (
        <>
            <div>
                <NavBar />
                <div className="px-16 py-12 w-4/6 mx-auto ">
                    <DayPicker selectedDay={selectedDay} selectDay={(value) => setSelectedDay(value)} />
                    {
                        selectedDay?.day !== 0 && (
                            <>
                                <h2 className='font-semibold text-lg py-4'>Horários disponíveis</h2>
                                <HourPicker selectedDate={selectedDay} selectHour={(value) => {
                                    setSelectedHour(value)
                                    setOpenedConfirmScheduling(true)
                                }} schedulingsMade={schedulingsMade} service={serviceSelected}/>
                                <ModalConfirmScheduling
                                    opened={openedConfirmScheduling}
                                    handleClose={() => setOpenedConfirmScheduling(false)}
                                    selectedDay={selectedDay}
                                    selectedHour={selectedHour}
                                    selectedService={serviceSelected}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Scheduling