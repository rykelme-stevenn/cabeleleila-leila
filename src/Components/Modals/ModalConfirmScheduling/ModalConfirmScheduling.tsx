import Modal from '@mui/material/Modal'
import { CompleteDateType, CompleteHourType, SchedulingType, ServiceType } from '../../../utils/types/types';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { estimateHour, formatarMoedaReal, formatDate, monthByNumber, weekdayToNumber } from '../../../utils/functions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PrimaryButton, SecondaryButton } from '../../Buttons/Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { saveScheduling, updateScheduling } from '../../../service/operational';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type ModalConfirmSchedulingProps = {
    opened: boolean;
    selectedHour: CompleteHourType;
    selectedDay: CompleteDateType;
    selectedService: ServiceType;
    handleClose: () => void;
    isEdit?: boolean;
    schedulingToEdit?: SchedulingType;
    handleExit?: () => void;
}

const ModalConfirmScheduling = ({ opened, handleClose, selectedHour, selectedDay, selectedService, isEdit, schedulingToEdit, handleExit }: ModalConfirmSchedulingProps) => {
    const userId = useSelector((state: RootState) => state.user.user?.id)
    const schedulings = useSelector((state: RootState) => state.scheduling.schedulings)
    const [haveSchedulingInSameWeek, setHaveSchedulingInSameWeek] = useState(false)
    const [schedulingInSameWeek, setSchedulingInSameWeek] = useState<SchedulingType | null>(null)
    const [successToSave, setSuccessToSave] = useState(false)

    useEffect(() => {
        verifySchedulingSameWeek()
    }, [opened])

    async function handleConfirmScheduling() {
        console.log(userId)
        if (!userId) return
        let schedulingData: SchedulingType = {
            user_id: userId,
            day: selectedDay.day,
            month: selectedDay.month,
            weekday: selectedDay.weekday,
            year: selectedDay.year,
            hour: selectedHour.hour,
            minute: selectedHour.minute,
            status: 1,
            service: selectedService
        }
        if(haveSchedulingInSameWeek && schedulingInSameWeek){
            schedulingData.day = schedulingInSameWeek?.day
            schedulingData.month = schedulingInSameWeek?.month
            schedulingData.year = schedulingInSameWeek?.year
            schedulingData.hour = schedulingInSameWeek?.hour
            schedulingData.minute = schedulingInSameWeek?.minute

        }
        let response = await saveScheduling(schedulingData)
        if (response != null) {
            setSuccessToSave(true)
        }
    }

    async function handleConfirmSchedulingEdit() {
        console.log(userId)
        if (!userId) return
        let schedulingData: SchedulingType = {
            user_id: userId,
            day: selectedDay.day,
            month: selectedDay.month,
            weekday: selectedDay.weekday,
            year: selectedDay.year,
            hour: selectedHour.hour,
            minute: selectedHour.minute,
            status: 1,
            service: selectedService,
            id: schedulingToEdit?.id
        }
        console.log(schedulingData)
        let response = await updateScheduling(schedulingData)
        if (response != null) {
            setSuccessToSave(true)
        }
    }

    function verifySchedulingSameWeek() {
        let sameWeekSchedulings = schedulings.filter((scheduling) => {
            let schedulingToDate = new Date(scheduling.year, scheduling.month, scheduling.day)
            let selectedSchedulingToDate = new Date(selectedDay.year, selectedDay.month, selectedDay.day)
            console.log(schedulingToDate > selectedSchedulingToDate)
            if (schedulingToDate > selectedSchedulingToDate) {
                const timeDifference = Math.abs(schedulingToDate.getTime() - selectedSchedulingToDate.getTime());
                const daysDifference = timeDifference / (1000 * 3600 * 24);
                console.log(daysDifference <= 7, 
                    (weekdayToNumber(selectedDay.weekday) > weekdayToNumber(scheduling.weekday)) , 
                    scheduling.status != 4 , 
                    scheduling.status != 3 , 
                    scheduling.user_id == userId)
                return (daysDifference <= 7 && 
                (weekdayToNumber(selectedDay.weekday) < weekdayToNumber(scheduling.weekday)) && 
                scheduling.status != 4 && 
                scheduling.status != 3 && 
                scheduling.user_id == userId) 
            }
        })
        console.log(sameWeekSchedulings)
        if (sameWeekSchedulings.length > 0) {
            sameWeekSchedulings.sort((a, b) => {
                const timeDifferenceA = (Math.abs(new Date(a.year, a.month, a.day).getTime() - new Date(selectedDay.year, selectedDay.month, selectedDay.day).getTime())) / (1000 * 3600 * 24);
                const timeDifferenceB = (Math.abs(new Date(b.year, b.month, b.day).getTime() - new Date(selectedDay.year, selectedDay.month, selectedDay.day).getTime())) / (1000 * 3600 * 24);

                return timeDifferenceA - timeDifferenceB;
            });
            console.log(sameWeekSchedulings[0])
            setSchedulingInSameWeek(sameWeekSchedulings[0])
            setHaveSchedulingInSameWeek(true)
        } else {
            setHaveSchedulingInSameWeek(false)
            setSchedulingInSameWeek(null)
        }
    }

    const SameWeekScheduling = () => {
        if(!schedulingInSameWeek) return <></>
        return (
            <div className='text-center'>
                <h2 className='font-semibold text-xl text-center mt-2'>Você possui agendamentos para essa semana!</h2>
                <p className='font-light text-lg mt-2 mb-4'>{`Você possui um agendamento para o dia ${formatDate(schedulingInSameWeek?.day, schedulingInSameWeek?.month + 1, '/')}. Deseja juntar esse agendamento com o agendamento já cadastrado?`}</p>
                
                <div className='mb-4'><PrimaryButton label={'Sim'} type={'button'}
                    onPress={() => handleConfirmScheduling()}
                /></div>
                <SecondaryButton label={'Não'} type={'button'} onPress={() => {
                    setSchedulingInSameWeek(null)
                    setHaveSchedulingInSameWeek(false)
                }}/>
            </div>
        )
    }

    const ConfirmContent = () => {
        return (
            <>
                {isEdit && <h2 className='font-semibold text-xl text-center mt-2'>Deseja alterar o agendamento para:</h2>}
                <div className='w-full h-full p-[16px] bg-[#eceded] rounded-md mt-4 flex justify-between mb-4'>
                    <div>
                        <p className='font-semibold text-lg mb-2'>{selectedService.name}</p>
                        <div className='flex items-center mb-2'>
                            <AccountCircleIcon fontSize='large' />
                            <p className='ml-2 font-medium text-base'>Leila</p>
                        </div>
                        <div className='flex'>
                            <p className="text-base font-medium text-[#159343] mr-6">{formatarMoedaReal(selectedService?.value)}</p>
                            <p className="text-base font-medium"><AccessTimeIcon fontSize='small' /> {selectedHour.hour}:{selectedHour.minute < 10 && '0'}{selectedHour.minute} - {estimateHour(selectedHour, selectedService.estimated_time)}</p>
                        </div>
                    </div>
                    <div className='content-center text-center'>
                        <p className='font-medium text-2xl'>{selectedDay.day}</p>
                        <p className="text-base font-normal">{monthByNumber(selectedDay.month)}</p>
                    </div>
                </div>

                <PrimaryButton type="button" label={`Confirmar ${isEdit ? 'alteração' : 'agendamento'}`} onPress={() => isEdit ? handleConfirmSchedulingEdit() : handleConfirmScheduling()} />
            </>
        )
    }

    return (
        <Modal
            open={opened}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div  className='lg:inline-table lg:rounded-lg bg-white w-full absolute bottom-0 lg:top-1/2 lg:w-1/2 lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%] p-5
             lg:top-1/2'>
                <div className='w-full flex items-center justify-end pb-4'>
                    <CancelIcon className='cursor-pointer hover:text-red-500' fontSize='large' onClick={() => handleClose()} />
                </div>
                <Divider />
                {
                    !successToSave ? (
                        <>
                            {
                                haveSchedulingInSameWeek ?
                                    <SameWeekScheduling />
                                    :
                                    <ConfirmContent />
                            }
                        </>
                    ) : (
                        <div className='flex flex-col items-center text-center px-[16px]'>
                            <CheckCircleIcon color='success' style={{ fontSize: 82 }} />
                            <h2 className='font-semibold text-2xl mt-2'>Agendamento {isEdit ? 'alterado' : 'feito'} com sucesso!</h2>
                            <p className='font-light text-base mt-2 mb-4'>{`Seu agendamento foi ${isEdit ? 'alterado' : 'salvo'} com sucesso para o dia ${haveSchedulingInSameWeek ? schedulingInSameWeek?.day : selectedDay.day} de ${monthByNumber(haveSchedulingInSameWeek && schedulingInSameWeek ? schedulingInSameWeek?.month : selectedDay.month)}. Aguarde seu agendamento ser confirmado pelo profissional que irá te atender.`}</p>
                            <PrimaryButton type="button" label="Ok" onPress={() => {
                                { handleExit ? handleExit() : handleClose() }
                            }} />
                        </div>
                    )
                }

            </div>
        </Modal>
    )
}

export default ModalConfirmScheduling