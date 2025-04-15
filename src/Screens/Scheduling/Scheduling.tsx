import { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { DayPicker } from '../../Components/DayPicker/DayPicker';
import HourPicker from '../../Components/HourPicker/HourPicker';
import { CompleteDateType, CompleteHourType, SchedulingType, ServiceType } from '../../utils/types/types';
import ModalConfirmScheduling from '../../Components/Modals/ModalConfirmScheduling/ModalConfirmScheduling';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSchedulings } from '../../service/operational';
import { useDispatch } from 'react-redux';
import { setScheduling } from '../../store/reducers/scheduling/scheduling';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Scheduling = () => {
    const [selectedDay, setSelectedDay] = useState<CompleteDateType>({
        day: 0,
        month: 0,
        year: 0,
        weekday: ''
    });
    const [selectedHour, setSelectedHour] = useState<CompleteHourType>({
        hour: 0,
        minute: 0
    });
    const [openedConfirmScheduling, setOpenedConfirmScheduling] = useState(false);
    const serviceSelected: ServiceType = useLocation().state?.service;
    const navigate = useNavigate()
    // const [schedulingsMade, setSchedulingsMade] = useState<Array<SchedulingType>>([])


    return (
        <>
            <div>
                <NavBar />
                <div className="lg:px-16 px-4 lg:py-12 py-4 lg:w-4/6 w-6/6 mx-auto ">
                    <ArrowBackIosIcon className='mb-4' onClick={() => navigate('/home')}/>
                    <DayPicker selectedDay={selectedDay} selectDay={(value) => setSelectedDay(value)} />
                    {
                        selectedDay?.day !== 0 && (
                            <>
                                <h2 className='font-semibold text-lg py-4'>Horários disponíveis</h2>
                                <HourPicker selectedDate={selectedDay} selectHour={(value) => {
                                    setSelectedHour(value)
                                    setOpenedConfirmScheduling(true)
                                }}  service={serviceSelected}/>
                                <ModalConfirmScheduling
                                    opened={openedConfirmScheduling}
                                    handleClose={() => setOpenedConfirmScheduling(false)}
                                    selectedDay={selectedDay}
                                    selectedHour={selectedHour}
                                    selectedService={serviceSelected}
                                    handleExit={() => {
                                        setOpenedConfirmScheduling(false)
                                        navigate('/home')
                                    }}
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