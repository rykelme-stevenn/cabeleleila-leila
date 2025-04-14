import Modal from '@mui/material/Modal'
import { CompleteDate, CompleteHour, Service } from '../../../utils/types/types';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';

type ModalConfirmSchedulingProps = {
    opened: boolean;
    selectedHour: CompleteHour;
    selectedDay: CompleteDate;
    selectedService: Service;
    handleClose: () => void;
}

const ModalConfirmScheduling = ({ opened, handleClose, selectedHour, selectedDay, selectedService }: ModalConfirmSchedulingProps) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        // boxShadow: 24,
        padding: 4,
    };

    useEffect(() => {
        console.log(selectedService)
    }, [opened])

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
                    <CancelIcon className='cursor-pointer hover:text-red-500' fontSize='large' onClick={() => handleClose()}/>
                </div>
                <Divider/>
                <div className='w-full p-[16px] bg-[#eceded]'>
                    <p>{selectedService.name}</p>
                </div>
            </div>
        </Modal>
    )
}

export default ModalConfirmScheduling