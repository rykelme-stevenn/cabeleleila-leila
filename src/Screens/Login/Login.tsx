import { useForm } from 'react-hook-form';
import { PasswordInput, EmailInput } from '../../Components/Inputs/Inputs';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import { validateEmail } from '../../utils/validations';
import { login } from '../../service/user';
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/reducers/user';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ loginError, setLoginError ] = useState(false)


    const onSubmit = async (data: LoginForm) => {
        console.log('Form Submitted:', data);
        let response = await login(data)
        if (response?.id) {
            dispatch(setUser(response ))
            navigate('Home')
        } else { setLoginError(true) }

    };

    return (
        <div id="body" className="w-full h-dvh flex justify-center items-center">
            <div className="w-80">
                <img src={logo} alt="logo" width={'100%'} />
                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="pt-4">
                            <EmailInput
                                {...register('email', { required: 'Digite o e-mail', validate: validateEmail })}
                                error={errors.email}
                            />
                        </div>
                        <div className="py-4">
                            <PasswordInput
                                {...register('password', { required: 'Digite a senha' })}
                                error={errors.password}
                            />
                        </div>
                        {loginError && <p className='text-red-500 pb-2 italic'>Email ou senha inválidos</p>}
                        <Button type="submit" variant="contained" className="w-full">
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;