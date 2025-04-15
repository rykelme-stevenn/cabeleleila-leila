import axios from 'axios';
import { UserType } from '../utils/types/types';
type LoginData = {
    email: string;
    password: string;
  };

export async function login(loginData: LoginData): Promise<UserType> {
    return await axios.get(`http://localhost:3000/users`, {
        params: {
            email: loginData.email
        }
    }).then((response) => {
        if (response?.data?.length > 0 && response?.data[0].password === loginData.password) {
            return response?.data[0];
        }
        return null
    }).catch((error) => {
        return error;
    });
}