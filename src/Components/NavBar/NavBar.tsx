import { useTheme } from "@mui/material"
import logoIcon from '../../assets/logoIcon.png'

const NavBar = () => {
    const theme = useTheme()
    console.log(theme.palette.primary.main)
    return (
        <div style={{backgroundColor: theme.palette.primary.main}} color='primary' className='px-16 py-2 flex items-center w-full h-16'>
            <img src={logoIcon} alt="" className="h-10"/>
        </div>
    )
}

export default NavBar