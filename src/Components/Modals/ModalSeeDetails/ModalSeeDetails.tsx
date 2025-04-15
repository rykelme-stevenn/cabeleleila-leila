import Modal from '@mui/material/Modal'
import { SchedulingType } from '../../../utils/types/types';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { estimateHour, formatarMoedaReal, formatDate, monthByNumber } from '../../../utils/functions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PrimaryButton } from '../../Buttons/Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getSchedulingById } from '../../../service/operational';
import { useTheme } from '@mui/material';
import StatusExhibition from '../../StatusExhibition/StatusExhibition';


type ModalConfirmSchedulingProps = {
    opened: boolean;
    handleClose: () => void;
    schedulingMadeId: string;
}

const ModalSeeDetails = ({ opened, handleClose, schedulingMadeId }: ModalConfirmSchedulingProps) => {
    const [schedulingMade, setSchedulingMade] = useState<SchedulingType>()

    useEffect(() => {
        if (opened === true) {
            handleGetSchedulingById()
        }
    }, [opened])

    async function handleGetSchedulingById() {
        let response = await getSchedulingById(schedulingMadeId)
        let scheduling = response
        setSchedulingMade(scheduling)
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
                {
                    schedulingMade &&
                    <>
                        <div className='w-full h-full p-[16px] bg-[#eceded] rounded-md mt-4 flex justify-between mb-4'>
                            <div>
                                <p className='font-semibold text-lg mb-2'>{schedulingMade?.service.name}</p>
                                <div className='flex items-center mb-2'>
                                    <AccountCircleIcon fontSize='large' />
                                    <p className='ml-2 font-medium text-base'>Leila</p>
                                </div>
                                <div className='flex lg:flex-row flex-col'>
                                    <p className="text-base font-medium text-[#159343] mr-6">{schedulingMade?.service.value && formatarMoedaReal(schedulingMade?.service?.value)}</p>
                                    <p className="text-base font-medium"><AccessTimeIcon fontSize='small' /> {formatDate(schedulingMade.hour, schedulingMade.minute, ':')} - {estimateHour(schedulingMade, schedulingMade?.service.estimated_time)}</p>
                                </div>
                                <div className=''>
                                    <StatusExhibition status={schedulingMade.status} />
                                </div>
                            </div>
                            <div className='content-center text-center'>
                                <p className='font-medium text-2xl'>{schedulingMade.day}</p>
                                <p className="text-base font-normal">{monthByNumber(schedulingMade.month)}</p>
                            </div>
                        </div>

                        <PrimaryButton type="button" label={'Fechar'} onPress={handleClose} />
                    </>

                }

            </div>
        </Modal>
    )
}

export default ModalSeeDetails