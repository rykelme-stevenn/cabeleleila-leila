import Modal from '@mui/material/Modal'
import { CompleteDateType, CompleteHourType, SchedulingType } from '../../../utils/types/types';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { validEditingPossible } from '../../../utils/functions';
import { PrimaryButton } from '../../Buttons/Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getSchedulingById } from '../../../service/operational';
import { useNavigate } from 'react-router-dom';
import LockClockIcon from '@mui/icons-material/LockClock';
import { DayPicker } from '../../DayPicker/DayPicker';
import HourPicker from '../../HourPicker/HourPicker';
import ModalConfirmScheduling from '../ModalConfirmScheduling/ModalConfirmScheduling';

type ModalEditSchedulingProps = {
    opened: boolean;
    handleClose: () => void;
    schedulingMadeId: string;
}

const ModalEditScheduling = ({ opened, schedulingMadeId, handleClose }: ModalEditSchedulingProps) => {
    const user = useSelector((state: RootState) => state.user.user)
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
    const [schedulingMade, setSchedulingMade] = useState<SchedulingType>()
    const [openedConfirmEdit, setOpenedConfirmEdit] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (opened === true) {
            handleGetSchedulingById()
        }
    }, [opened])

    async function handleGetSchedulingById() {
        let response = await getSchedulingById(schedulingMadeId)
        let scheduling = response
        setSchedulingMade(scheduling)
        setSelectedHour({ hour: scheduling.hour, minute: scheduling.minute })
        setSelectedDay({ day: scheduling.day, month: scheduling.month, weekday: scheduling.weekday, year: scheduling.year })

    }

    return (
        <Modal
            open={opened}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='lg:inline-table lg:rounded-lg bg-white w-full absolute bottom-0 lg:top-1/2 lg:w-1/2 lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%] p-5
             lg:top-1/2'>
                <div className='w-full flex items-center justify-end pb-4'>
                    <CancelIcon className='cursor-pointer hover:text-red-500' fontSize='large' onClick={() => handleClose()} />
                </div>
                <Divider />
                <div className='mt-4'>
                    {
                        validEditingPossible(schedulingMade) || user?.owner ? (<>
                            <DayPicker selectedDay={selectedDay} selectDay={(value) => setSelectedDay(value)} />
                            {
                                selectedDay?.day !== 0 && schedulingMade && (
                                    <>
                                        <h2 className='font-semibold text-lg py-4'>Horários disponíveis</h2>
                                        <HourPicker selectedDate={selectedDay} selectHour={(value) => {
                                            setSelectedHour(value)
                                            setOpenedConfirmEdit(true)
                                        }} service={schedulingMade.service} schedulingToEdit={schedulingMade} />
                                        <ModalConfirmScheduling
                                            opened={openedConfirmEdit}
                                            handleClose={() => {
                                                setOpenedConfirmEdit(false)
                                            }}
                                            handleExit={() => {
                                                setOpenedConfirmEdit(false)
                                                handleClose()
                                                navigate('/home')
                                            }}
                                            selectedDay={selectedDay}
                                            selectedHour={selectedHour}
                                            selectedService={schedulingMade.service}
                                            schedulingToEdit={schedulingMade}
                                            isEdit={true}

                                        />
                                    </>
                                )
                            }
                        </>) :
                            (
                                <div className='flex flex-col items-center text-center'>
                                    <LockClockIcon style={{ fontSize: 82 }} />
                                    <h2 className='font-semibold text-2xl mt-2'>Não é possível alterar o agendamento</h2>
                                    <p className='font-light text-base mt-2 mb-2'>{`Só é possível alterar o agendamento, pelo sistema, 2 dias antes do horário agendado. Segue o número de contato para tratativa direta com o estabelecimento:`}</p>
                                    <p className='font-semibold text-base mt-2 mb-4'>(13) 99368-1442</p>
                                    <PrimaryButton type="button" label='ok' onPress={handleClose} />
                                </div>
                            )
                    }
                </div>
            </div>
        </Modal>
    )
}

export default ModalEditScheduling