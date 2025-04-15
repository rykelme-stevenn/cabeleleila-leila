import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material';
import { statusValue } from '../../utils/functions';

const StatusExhibition = ({status} : {status: number}) => {
    const theme = useTheme();

    if (!status) return <></>
    return (
        <div className='flex items-center py-2'>

            {status === 1 && (<>
                <CircleIcon fontSize='inherit' color='warning' />
                <p className="text-base font-medium justify-center ml-2" style={{ color: theme.palette.warning.main }} >{statusValue(status)}</p>
            </>)}

            {status === 2 && (<>
                <CircleIcon fontSize='inherit' color='success' />
                <p className="text-base font-medium justify-center ml-2" style={{ color: theme.palette.success.main }}>{statusValue(status)}</p>
            </>)}
            {status === 3 && (<>
                <CircleIcon fontSize='inherit' color='info' />
                <p className="text-base font-medium justify-center ml-2" style={{ color: theme.palette.info.main }}>{statusValue(status)}</p>
            </>)}
            {status === 4 && (<>
                <CircleIcon fontSize='inherit' color='error' />
                <p className="text-base font-medium justify-center ml-2" style={{ color: theme.palette.error.dark }}>{statusValue(status)}</p>
            </>)}
        </div>
    )
}

export default StatusExhibition