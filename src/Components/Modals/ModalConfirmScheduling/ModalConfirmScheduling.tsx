import Modal from '@mui/material/Modal'
import { CompleteDateType, CompleteHourType, SchedulingType, ServiceType } from '../../../utils/types/types';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { estimateHour, formatarMoedaReal, monthByNumber } from '../../../utils/functions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PrimaryButton } from '../../Buttons/Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { saveScheduling } from '../../../service/operational';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type ModalConfirmSchedulingProps = {
    opened: boolean;
    selectedHour: CompleteHourType;
    selectedDay: CompleteDateType;
    selectedService: ServiceType;
    handleClose: () => void;
}

const ModalConfirmScheduling = ({ opened, handleClose, selectedHour, selectedDay, selectedService }: ModalConfirmSchedulingProps) => {
    const userId = useSelector((state: RootState) => state.user.user?.id)
    const navigate = useNavigate()
    const [successToSave, setSuccessToSave] = useState(false)

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
            service_id: selectedService.id
        }

        let response = await saveScheduling(schedulingData)
        if (response != null) {
            setSuccessToSave(true)
        }
    }

    return (
        <Modal
            open={opened}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                backgroundColor: 'white',
                borderRadius: 6,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: 12,
            }}>
                <div className='w-full flex items-center justify-end pb-4'>
                    <CancelIcon className='cursor-pointer hover:text-red-500' fontSize='large' onClick={() => handleClose()} />
                </div>
                <Divider />
                {
                    !successToSave ? (
                    <>
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

                        <PrimaryButton type="button" label="Confirmar agendamento" onPress={() => handleConfirmScheduling()} />
                    </>
                    ) : (
                        <div className='flex flex-col items-center text-center px-[16px]'>
                            <CheckCircleIcon color='success' style={{fontSize: 82}} />
                            <h2 className='font-semibold text-2xl mt-2'>Agendamento feito com sucesso!</h2>
                            <p className='font-light text-base mt-2 mb-4'>{`Seu agendamento foi salvo com sucesso para o dia ${selectedDay.day} de ${monthByNumber(selectedDay.month)}. Aguarde seu agendamento ser confirmado pelo profissional que irá te atender.`}</p>
                            <PrimaryButton type="button" label="Ok" onPress={() => {
                                navigate('/home')
                                handleClose()
                            }} />
                        </div>
                    )
                }

            </div>
        </Modal>
    )
}

export default ModalConfirmScheduling