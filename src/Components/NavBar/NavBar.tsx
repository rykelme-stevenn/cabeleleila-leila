import { useTheme } from "@mui/material"
import logoIcon from '../../assets/logoIcon.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/user";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: theme.palette.primary.main }} color='primary' className='lg:px-16 px-4 py-2 flex items-center w-full h-16 justify-between'>
            <img src={logoIcon} alt="" className="h-10" />
            <LogoutIcon style={{ color: 'white' }} className="cursor-pointer" onClick={() => {
                dispatch(setUser(null))
                navigate('/home')
            }} />
        </div>
    )
}

export default NavBar