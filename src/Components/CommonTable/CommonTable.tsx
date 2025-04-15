import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PrimaryButton } from '../Buttons/Buttons';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type CommonTableType = {
  headers: Array<{ name: string, ref: string }>
  rows: Array<any>,
  actions: Array<string>
  handleEdit?: (id: string) => void;
  handleView?: (id: string) => void;
  handleChangeStatus?: (status: number, id: string) => void;
}

const CommonTable = ({ headers, rows, actions, handleEdit, handleView, handleChangeStatus }: CommonTableType) => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user.user)

  function statusConfig(status: number, action: boolean = false) {
    switch (status) {
      case 1:
        return { status: `Solicita${action ? 'r' : 'do'}`, color: theme.palette.warning.main }
      case 2:
        return { status: `Confirma${action ? 'r' : 'do'}`, color: theme.palette.success.main }
      case 3:
        return { status: `Finaliza${action ? 'r' : 'do'}`, color: theme.palette.info.main }
      case 4:
        return { status: `Cancela${action ? 'r' : 'do'}`, color: theme.palette.error.dark }
      default:
        break;
    }
  }

  const getNestedValue = (row: any, ref: string) => {
    const keys = ref.split('.');
    return keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : ''), row);
  };

  const ActionsOptions = ({ item }: { item: any }) => {
    return (
      <div className=' gap-3 flex items-center'>

        {(actions.some((value) => value === 'edit') && item.status_number !== 3 && item.status_number !== 4) && <CreateIcon fontSize='medium' className='cursor-pointer hover:text-[#F7C1D2]' onClick={() => handleEdit && handleEdit(item.id)} />}
        {actions.some((value) => value === 'view') && <VisibilityIcon fontSize='medium' className='cursor-pointer hover:text-[#F7C1D2]' onClick={() => handleView && handleView(item.id)} />}
        {
          (actions.some((value) => value === 'status') && item.status_number < 3 && user?.owner) &&
          <div>
            <PrimaryButton
              color={statusConfig(item?.status_number + 1)?.color} label={`${statusConfig(item?.status_number + 1, true)?.status}`}
              type='button'
              onPress={() => handleChangeStatus && handleChangeStatus(item.status_number + 1, item.id)} />
          </div>
        }

        {
          (actions.some((value) => value === 'status') && item.status_number == 1 && user?.owner) &&
          <div>
            <PrimaryButton
              color={statusConfig(4)?.color} label={`${statusConfig(4, true)?.status}`}
              type='button'
              onPress={() => handleChangeStatus && handleChangeStatus(4, item.id)} />
          </div>
        }
      </div>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headers.map((header) => (
                <TableCell><p className='font-bold'>{header.name}</p></TableCell>
              ))
            }
            {actions.length > 0 && <TableCell><p className='font-bold'>Ações</p></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {headers.map((header) => (
                <TableCell key={`${rowIndex}-${header.ref}`}>
                  <p className='text-base'>{getNestedValue(row, header.ref)}</p>
                </TableCell>
              ))}
              {actions.length > 0 && <TableCell>
                <ActionsOptions item={row} />
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CommonTable