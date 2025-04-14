import { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { DayPicker } from '../../Components/DayPicker/DayPicker';
import HourPicker from '../../Components/HourPicker/HourPicker';
import { CompleteDate, CompleteHour } from '../../utils/types/types';
import ModalConfirmScheduling from '../../Components/Modals/ModalConfirmScheduling/ModalConfirmScheduling';
import { useLocation } from 'react-router-dom';


const Scheduling = () => {
    const [selectedDay, setSelectedDay] = useState<CompleteDate>({
        day: 0,
        month: 0,
        year: 0,
        weekday: ''
    })
    const [selectedHour, setSelectedHour] = useState<CompleteHour>({
        hour: 0,
        minute: 0
    })
    const [openedConfirmScheduling, setOpenedConfirmScheduling] = useState(false)
    const serviceSelected = useLocation().state?.service; 

    // useEffect(() => {
    //     console.log(location.state?.service)
    // }, [])

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
                                }}/>
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